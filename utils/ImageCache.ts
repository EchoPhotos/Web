import { useState } from 'react';

export enum ImageFormat {
  Thumbnail,
  Preview,
  Original,
}
// Key generator function for consistent storage keys
const generateKey = (imageId: string, format: ImageFormat) =>
  `image_${imageId}_${ImageFormat[format]}`;

// Properly typed hook with error handling and validation
export function useImageCache(
  imageId: string | undefined,
  format: ImageFormat,
  initialValue: Blob | undefined,
): [Blob | undefined, (value: Blob) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<Blob | undefined>(() => {
    if (!imageId) {
      console.warn('imageId is required for useImageCache');
      return initialValue;
    }

    try {
      const item = localStorage.getItem(generateKey(imageId, format));
      if (!item) return initialValue;

      const byteCharacters = atob(item);
      // Add a sanity check for decoding
      if (byteCharacters.length === 0) throw new Error('Decoded Base64 string is empty');

      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'image/jpeg' });
    } catch (error) {
      console.error('Error decoding Base64 data from localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  async function setValue(value: Blob) {
    if (!imageId) {
      return;
    }
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        localStorage.setItem(generateKey(imageId, format), base64data);
      };
      reader.readAsDataURL(value);

      setStoredValue(value);
    } catch (error) {
      console.error('Error setting value in localStorage:', error);
      throw error;
    }
  }

  return [storedValue, setValue];
}
