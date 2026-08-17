'use client';

import { useCallback, useEffect, useState } from 'react';
import { getImage, getPreviewBuffer, getThumbnailBuffer } from './ImageTools';

export enum ImageFormat {
  Thumbnail,
  Preview,
  Original,
}

const CACHE_NAME = 'image-cache-v2';

type ImageCacheState = 'checking' | 'miss' | 'ready';

// Cache entries must not depend on the page URL the component was mounted under.
const generateKey = (imageId: string, format: ImageFormat) =>
  new URL(
    `/__echo-image-cache__/v2/${encodeURIComponent(imageId)}/${ImageFormat[format]}`,
    window.location.origin,
  ).toString();

// Properly typed hook with error handling and validation
export function useImageCache(
  imageId: string | undefined,
  format: ImageFormat,
): {
  imageBlob: Blob | undefined;
  cacheState: ImageCacheState;
  setImageBlob: (value: Blob) => Promise<void>;
} {
  const [storedValue, setStoredValue] = useState<Blob | undefined>(undefined);
  const [cacheState, setCacheState] = useState<ImageCacheState>(imageId ? 'checking' : 'miss');

  useEffect(() => {
    let cancelled = false;
    setStoredValue(undefined);

    if (!imageId) {
      setCacheState('miss');
      return;
    }

    setCacheState('checking');
    const fetchCachedImage = async () => {
      const blob = await getCachedImageFor(imageId, format);
      if (!cancelled) {
        setStoredValue(blob);
        setCacheState(blob ? 'ready' : 'miss');
      }
    };

    void fetchCachedImage();

    return () => {
      cancelled = true;
    };
  }, [imageId, format]);

  const setValue = useCallback(
    async (value: Blob) => {
      if (!imageId) {
        return;
      }

      setStoredValue(value);
      setCacheState('ready');
      await cacheImageFor(imageId, format, value);
    },
    [imageId, format],
  );

  return { imageBlob: storedValue, cacheState, setImageBlob: setValue };
}

export async function getCachedImageFor(
  imageId: string,
  format: ImageFormat,
): Promise<Blob | undefined> {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cacheKey = generateKey(imageId, format);

    // Check if the image is already cached
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return await cachedResponse.blob();
    }
  } catch (error) {
    console.error('Error fetching cached image:', error);
  }
}

export async function cacheOriginalImage(imageId: string, file: File) {
  const image = await getImage(file);
  const preview = getPreviewBuffer(image);
  const thumbnail = getThumbnailBuffer(image);
  await Promise.all([
    cacheImageFor(imageId, ImageFormat.Preview, toBlob(preview)),
    cacheImageFor(imageId, ImageFormat.Thumbnail, toBlob(thumbnail)),
  ]);
}

export async function cacheImageFor(imageId: string, format: ImageFormat, blob: Blob) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cacheKey = generateKey(imageId, format);

    // Store the new Blob in the Cache API
    await cache.put(cacheKey, new Response(blob));
  } catch (error) {
    console.error('Error setting value in Cache API:', error);
  }
}

function toBlob(buffer: Uint8Array<ArrayBufferLike>): Blob {
  // Normalize to an ArrayBuffer-backed typed array so BlobPart typing is stable.
  return new Blob([Uint8Array.from(buffer)]);
}
