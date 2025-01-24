import { imageURL } from '@utils/API';
import { getToken } from '@utils/Auth';
import { ImageFormat, useImageCache } from '@utils/ImageCache';
import { useEffect, useState, useRef } from 'react';
import Spinner from './Spinner';
import { IoImage } from 'react-icons/io5';

export default function CachedImage({
  imageId,
  inviteId,
  format,
  onLoad,
}: {
  imageId?: string;
  inviteId?: string;
  format: ImageFormat;
  onLoad?: () => void;
}) {
  const [imageBlob, setImageBlob] = useImageCache(imageId, format, undefined);
  const [isVisible, setIsVisible] = useState(false);
  const imageUrl = imageURL(imageId, format, inviteId);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageBlob || !isVisible || !imageId) return;

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
  }, [imageUrl, isVisible, imageBlob, imageId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = containerRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  if (!imageId) {
    return (
      <div ref={containerRef} className="h-full w-full content-center text-slate-500">
        <IoImage className="m-auto" size={33} />
      </div>
    );
  }

  if (imageBlob) {
    if (onLoad) {
      onLoad();
    }
    const objectURL = URL.createObjectURL(imageBlob);
    return (
      <div ref={containerRef} className="h-full w-full content-center text-slate-500">
        <img
          src={objectURL}
          className="relative inset-0 h-full w-full object-cover object-center"
        />
      </div>
    );
  } else {
    return (
      <div ref={containerRef} className="h-full w-full content-center text-slate-500">
        {isVisible ? <Spinner /> : <div />}
      </div>
    );
  }
}
