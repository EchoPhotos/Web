import { decode, InterpolationType, Image, encodeJpeg } from 'image-js';
import { convert } from 'heic-convert';

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
