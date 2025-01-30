'use client';

import { Image } from 'image-js';
import { useState, useEffect } from 'react';
import { blob } from 'stream/consumers';

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

// Properly typed hook with error handling and validation
export function useImageCache(
  imageId: string | undefined,
  format: ImageFormat,
): [Blob | undefined, (value: Blob) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    if (!imageId) {
      console.warn('imageId is required for useImageCache');
      return;
    }

    const fetchCachedImage = async () => {
      const blob = await getCachedImageFor(imageId, format);
      if (blob) {
        setStoredValue(blob);
      }
    };

    fetchCachedImage();
  }, [imageId, format]);

  // Update Cache API when state changes
  async function setValue(value: Blob) {
    if (!imageId) {
      return;
    }

    cacheImageFor(imageId, format, value);
    setStoredValue(value);
  }

  return [storedValue, setValue];
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

export async function cacheImageFor(imageId: string, format: ImageFormat, blob: Blob) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cacheKey = generateKey(imageId, format);

    // Store the new Blob in the Cache API
    await cache.put(cacheKey, new Response(blob));
  } catch (error) {
    console.error('Error setting value in Cache API:', error);
    throw error;
  }
}
