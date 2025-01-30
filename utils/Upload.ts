import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@utils/FirebaseConfig';
import { Image, InterpolationType, decode, encodeJpeg } from 'image-js';
import { convert } from 'heic-convert';
import { getImage, getPreviewBuffer, getThumbnailBuffer } from './ImageTools';

export interface FileUpload {
  file: File;
  progress: number;
  uploadId: string;
}

export async function uploadFile(upload: FileUpload, onProgress: (progress: number) => void) {
  const storageRef = ref(storage, `uploads/${upload.uploadId}/original.jpg`);
  const uploadTask = uploadBytesResumable(storageRef, upload.file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      console.error('Upload error: ', error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    },
  );
}

export async function uploadFileWithPreview(
  upload: FileUpload,
  onProgress: (progress: number) => void,
) {
  try {
    const image = await getImage(upload.file);
    const arrayBuffer = await upload.file.arrayBuffer();
    const thumbnailBuffer = getThumbnailBuffer(image);
    const previewBuffer = getPreviewBuffer(image);

    const originalUploadTask = uploadBytesResumable(
      ref(storage, `uploads/${upload.uploadId}/original.jpg`),
      arrayBuffer,
    );
    const thumbnailUploadTask = uploadBytesResumable(
      ref(storage, `uploads/${upload.uploadId}/thumbnail.jpg`),
      thumbnailBuffer,
    );
    const previewUploadTask = uploadBytesResumable(
      ref(storage, `uploads/${upload.uploadId}/preview.jpg`),
      previewBuffer,
    );

    const uploadTasks = [originalUploadTask, thumbnailUploadTask, previewUploadTask];

    const totalBytes = uploadTasks.reduce((sum, task) => sum + task.snapshot.totalBytes, 0);
    const uploadedBytes = new Map<string, number>();

    uploadTasks.forEach((task) => {
      task.on(
        'state_changed',
        (snapshot) => {
          uploadedBytes.set(snapshot.ref.fullPath, snapshot.bytesTransferred);
          const totalBytesTransferred = Array.from(uploadedBytes.values()).reduce(
            (sum, value) => sum + value,
            0,
          );
          const progress = (totalBytesTransferred / totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          console.error('Upload error: ', error);
        },
      );
    });

    // Wait for all uploads to complete
    const [originalSnapshot, thumbnailSnapshot, previewSnapshot] = await Promise.all(
      uploadTasks.map((task) => task.then()),
    );

    return;
  } catch (error) {
    console.error('Upload process failed:', error);
    throw error;
  }
}
