import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@utils/FirebaseConfig';
import { Image, InterpolationType, decode, encodeJpeg } from 'image-js';
import { convert } from 'heic-convert';

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
    // Read the uploaded file as a buffer
    const arrayBuffer = await upload.file.arrayBuffer();
    const arrayBufferView = new Uint8Array(arrayBuffer);

    let image = await decode(arrayBufferView);

    if (upload.file.type === 'heic') {
      image = await convert({
        buffer: image, // the HEIC file buffer
        format: 'JPEG', // output format
        quality: 0.9, // the jpeg compression quality, between 0 and 1
      });
    }

    // Generate thumbnail (200x200)
    const thumbnail = image.resize({
      width: 200,
      height: 200,
      preserveAspectRatio: false,
      interpolationType: InterpolationType.BILINEAR,
    });
    const thumbnailBuffer = encodeJpeg(thumbnail);

    const preview = image.resize(
      image.width < image.height
        ? { width: 720, preserveAspectRatio: true, interpolationType: InterpolationType.BILINEAR }
        : { height: 720, preserveAspectRatio: true, interpolationType: InterpolationType.BILINEAR },
    );
    const previewBuffer = encodeJpeg(preview);

    // Upload original file
    const originalRef = ref(storage, `uploads/${upload.uploadId}/original.jpg`);
    const originalUploadTask = uploadBytesResumable(originalRef, arrayBuffer);

    // Upload thumbnail
    const thumbnailRef = ref(storage, `uploads/${upload.uploadId}/thumbnail.jpg`);
    const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnailBuffer);

    // Upload preview
    const previewRef = ref(storage, `uploads/${upload.uploadId}/preview.jpg`);
    const previewUploadTask = uploadBytesResumable(previewRef, previewBuffer);

    // Track overall upload progress
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
