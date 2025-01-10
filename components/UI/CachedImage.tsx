import { imageURL } from '@utils/API';
import { getToken } from '@utils/Auth';
import { ImageFormat, useImageCache } from '@utils/ImageCache';
import { useEffect } from 'react';
import Spinner from './Spinner';
import { IoImage } from 'react-icons/io5';

export default function CachedImage({
  imageId,
  format,
}: {
  imageId?: string;
  format: ImageFormat;
}) {
  const [imageBlob, setImageBlob] = useImageCache(imageId, format, undefined);
  const imageUrl = imageURL(imageId, format);
  useEffect(() => {
    if (imageBlob) {
      return;
    }
    getToken().then((token) => {
      fetch(imageUrl, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      })
        .then((response) => response.blob())
        .then((blob) => {
          setImageBlob(blob);
        });
    });
  }, [imageUrl]);

  if (!imageId) {
    return (
      <div className="h-full w-full content-center bg-slate-700 text-slate-500">
        <IoImage className="m-auto" size={33} />
      </div>
    );
  }

  if (imageBlob) {
    const objectURL = URL.createObjectURL(imageBlob);
    return (
      <div className="h-full w-full content-center bg-slate-700 text-slate-500">
        <img
          src={objectURL}
          className="relative inset-0 h-full w-full object-cover object-center"
        />
      </div>
    );
  } else {
    return (
      <div className="h-full w-full content-center bg-slate-700 text-slate-500">
        <Spinner />
      </div>
    );
  }
}
