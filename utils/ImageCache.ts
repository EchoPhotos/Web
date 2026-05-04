'use client';

import { useCallback, useEffect, useState } from 'react';
import { getImage, getPreviewBuffer, getThumbnailBuffer } from './ImageTools';

export enum ImageFormat {
  Thumbnail,
  Preview,
  Original,
}

// Key generator function for consistent storage keys
const generateKey = (imageId: string, format: ImageFormat) =>
  `image_${imageId}_${ImageFormat[format]}`;

// Cache name for the Cache API
const CACHE_NAME = 'image-cache';
const MEMORY_CACHE_LIMIT = 150;
const memoryCache = new Map<string, Blob>();
const pendingCacheReads = new Map<string, Promise<Blob | undefined>>();

function rememberBlob(cacheKey: string, blob: Blob) {
  if (memoryCache.has(cacheKey)) {
    memoryCache.delete(cacheKey);
  }

  memoryCache.set(cacheKey, blob);

  if (memoryCache.size > MEMORY_CACHE_LIMIT) {
    const oldestKey = memoryCache.keys().next().value;
    if (oldestKey) {
      memoryCache.delete(oldestKey);
    }
  }
}

// Properly typed hook with error handling and validation
export function useImageCache(
  imageId: string | undefined,
  format: ImageFormat,
): [Blob | undefined, (value: Blob) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<Blob | undefined>(() => {
    if (!imageId) {
      return undefined;
    }

    return memoryCache.get(generateKey(imageId, format));
  });

  useEffect(() => {
    if (!imageId) {
      setStoredValue(undefined);
      return;
    }

    let isCancelled = false;
    const cachedBlob = memoryCache.get(generateKey(imageId, format));
    if (cachedBlob) {
      setStoredValue(cachedBlob);
      return;
    }

    setStoredValue(undefined);

    const fetchCachedImage = async () => {
      const blob = await getCachedImageFor(imageId, format);
      if (blob && !isCancelled) {
        setStoredValue(blob);
      }
    };

    fetchCachedImage();

    return () => {
      isCancelled = true;
    };
  }, [imageId, format]);

  // Update Cache API when state changes
  const setValue = useCallback(
    async (value: Blob) => {
      if (!imageId) {
        return;
      }

      void cacheImageFor(imageId, format, value);
      setStoredValue(value);
    },
    [format, imageId],
  );

  return [storedValue, setValue];
}

export async function getCachedImageFor(
  imageId: string,
  format: ImageFormat,
): Promise<Blob | undefined> {
  const cacheKey = generateKey(imageId, format);
  const cachedBlob = memoryCache.get(cacheKey);
  if (cachedBlob) {
    rememberBlob(cacheKey, cachedBlob);
    return cachedBlob;
  }

  const pendingRead = pendingCacheReads.get(cacheKey);
  if (pendingRead) {
    return pendingRead;
  }

  const readPromise = (async () => {
    try {
      const cache = await caches.open(CACHE_NAME);

      // Check if the image is already cached
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        const blob = await cachedResponse.blob();
        rememberBlob(cacheKey, blob);
        return blob;
      }
    } catch (error) {
      console.error('Error fetching cached image:', error);
    } finally {
      pendingCacheReads.delete(cacheKey);
    }
  })();

  pendingCacheReads.set(cacheKey, readPromise);

  try {
    return await readPromise;
  } catch {
    return undefined;
  }
}

export async function cacheOriginalImage(imageId: string, file: File) {
  const image = await getImage(file);
  const preview = getPreviewBuffer(image);
  const thumbnail = getThumbnailBuffer(image);
  cacheImageFor(imageId, ImageFormat.Preview, toBlob(preview));
  cacheImageFor(imageId, ImageFormat.Thumbnail, toBlob(thumbnail));
}

export async function cacheImageFor(imageId: string, format: ImageFormat, blob: Blob) {
  const cacheKey = generateKey(imageId, format);
  rememberBlob(cacheKey, blob);

  try {
    const cache = await caches.open(CACHE_NAME);

    // Store the new Blob in the Cache API
    await cache.put(cacheKey, new Response(blob));
  } catch (error) {
    console.error('Error setting value in Cache API:', error);
    throw error;
  }
}

function toBlob(buffer: Uint8Array<ArrayBufferLike>): Blob {
  // Normalize to an ArrayBuffer-backed typed array so BlobPart typing is stable.
  return new Blob([Uint8Array.from(buffer)]);
}
