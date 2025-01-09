import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@utils/FirebaseConfig';
import { Image } from 'image-js';

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

    const image = await Image.load(arrayBuffer);

    const interpolation = 'bilinear' as 'nearestNeighbor';
    // Generate thumbnail (200x200)
    const thumbnailBuffer = image
      .resize({ width: 200, height: 200, preserveAspectRatio: false, interpolation: interpolation })
      .toBuffer({ format: 'jpg' });

    const previewBuffer = image
      .resize(
        image.width < image.height
          ? { width: 720, preserveAspectRatio: true, interpolation: interpolation }
          : { height: 720, preserveAspectRatio: true, interpolation: interpolation },
      )
      .toBuffer({ format: 'jpg' });

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
    let totalBytesTransferred = 0;
    let totalBytes = uploadTasks.reduce((sum, task) => sum + task.snapshot.totalBytes, 0);

    uploadTasks.forEach((task) => {
      task.on(
        'state_changed',
        (snapshot) => {
          totalBytesTransferred += snapshot.bytesTransferred;
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
