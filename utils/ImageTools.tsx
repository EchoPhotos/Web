import { decode, InterpolationType, Image, encodeJpeg } from 'image-js';
import { convert } from 'heic-convert';
import EXIF from 'exif-js';
import piexif from 'piexif-ts';

export async function resizeImageToUint8Array(file: File) {
  // Extract EXIF metadata
  const exifBytes = await getExifBytes(file);

  const orientation = await getOrientation(file);
  const bitmap = await createImageBitmap(file);
  await resizeAndCorrect(bitmap, orientation, exifBytes, 720);
}

async function getExifBytes(file: File): Promise<Uint8Array | null> {
    const exifData = EXIF.getAllTags(this);
    console.log(exifData);
}

async function getOrientation(file: File): Promise<number> {
  const data = EXIF.readFromBinaryFile(file);
  return EXIF.getTag(data, 'Orientation') || 1;
}

async function resizeAndCorrect(
  imageBitmap: ImageBitmap,
  orientation: number,
  exifBytes: string,
  minWidth: number,
): Promise<Uint8Array> {
  let { width, height } = imageBitmap;

  // Resize while keeping aspect ratio (smaller side ≤ minWidth px)
  let newWidth, newHeight;
  if (width < height) {
    newWidth = Math.min(minWidth, width);
    newHeight = (newWidth / width) * height;
  } else {
    newHeight = Math.min(minWidth, height);
    newWidth = (newHeight / height) * width;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }

  // Adjust canvas size for EXIF orientation
  if ([5, 6, 7, 8].includes(orientation)) {
    canvas.width = newHeight;
    canvas.height = newWidth;
  } else {
    canvas.width = newWidth;
    canvas.height = newHeight;
  }

  // Apply EXIF orientation correction
  ctx.save();
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, newWidth, 0);
      break; // Mirror X
    case 3:
      ctx.transform(-1, 0, 0, -1, newWidth, newHeight);
      break; // Rotate 180°
    case 4:
      ctx.transform(1, 0, 0, -1, 0, newHeight);
      break; // Mirror Y
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break; // Mirror XY + Rotate 90° CW
    case 6:
      ctx.transform(0, 1, -1, 0, newHeight, 0);
      break; // Rotate 90° CW
    case 7:
      ctx.transform(0, -1, -1, 0, newHeight, newWidth);
      break; // Mirror XY + Rotate 270° CW
    case 8:
      ctx.transform(0, -1, 1, 0, 0, newWidth);
      break; // Rotate 270° CW
  }

  ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);
  ctx.restore();

  // Convert canvas to base64 and insert EXIF metadata back
  const resizedDataURL = canvas.toDataURL('image/jpeg', 0.85);
  const finalDataURL = piexif.insert(exifBytes, resizedDataURL);

  // Convert base64 to Uint8Array
  const res = await fetch(finalDataURL);

  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
}

export function getThumbnailBuffer(image: Image) {
  // Generate thumbnail (200x200)
  const thumbnail = image.resize({
    width: 200,
    height: 200,
    preserveAspectRatio: false,
    interpolationType: InterpolationType.BILINEAR,
  });
  return encodeJpeg(thumbnail);
}

export function getPreviewBuffer(image: Image) {
  const preview = image.resize(
    image.width < image.height
      ? { width: 720, preserveAspectRatio: true, interpolationType: InterpolationType.BILINEAR }
      : { height: 720, preserveAspectRatio: true, interpolationType: InterpolationType.BILINEAR },
  );
  return encodeJpeg(preview);
}

export async function getImage(file: File): Promise<Image> {
  const arrayBuffer = await file.arrayBuffer();

  let image: Image;

  if (file.type === 'heic') {
    image = await convert({
      buffer: arrayBuffer, // the HEIC file buffer
      format: 'JPEG', // output format
      quality: 0.9, // the jpeg compression quality, between 0 and 1
    });
  } else {
    const arrayBufferView = new Uint8Array(arrayBuffer);
    image = decode(arrayBufferView);
  }
  return image;
}
