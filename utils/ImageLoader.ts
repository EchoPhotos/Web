import { imageURL } from '@utils/API';
import { getToken } from '@utils/Auth';
import { cacheImageFor, getCachedImageFor, ImageFormat } from '@utils/ImageCache';

interface ImageLoadOptions {
  imageId?: string;
  inviteId?: string;
  format: ImageFormat;
}

const inFlightImageRequests = new Map<string, Promise<Blob>>();

function requestKey({ imageId, inviteId, format }: ImageLoadOptions) {
  return `${inviteId ?? 'album'}:${imageId ?? 'missing'}:${ImageFormat[format]}`;
}

export async function loadImageBlob(options: ImageLoadOptions): Promise<Blob | undefined> {
  const { imageId, format } = options;
  if (!imageId) {
    return undefined;
  }

  const cachedBlob = await getCachedImageFor(imageId, format);
  if (cachedBlob) {
    return cachedBlob;
  }

  const key = requestKey(options);
  const existingRequest = inFlightImageRequests.get(key);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
    const token = await getToken();
    const response = await fetch(imageURL(imageId, format, options.inviteId), {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image ${imageId} (${response.status})`);
    }

    const blob = await response.blob();
    void cacheImageFor(imageId, format, blob).catch((error) => {
      console.error('Failed to cache image:', error);
    });
    return blob;
  })();

  inFlightImageRequests.set(key, request);

  try {
    return await request;
  } finally {
    inFlightImageRequests.delete(key);
  }
}

export function prefetchImage(options: ImageLoadOptions) {
  void loadImageBlob(options).catch((error) => {
    console.error('Failed to prefetch image:', error);
  });
}
