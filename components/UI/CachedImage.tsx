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
  className,
  nobackground,
}: {
  imageId?: string;
  inviteId?: string;
  format: ImageFormat;
  onLoad?: () => void;
  className?: string;
  nobackground?: boolean;
}) {
  const [imageBlob, setImageBlob] = useImageCache(imageId, format);
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

  function content() {
    if (!imageId) {
      return <IoImage className="m-auto" size={33} />;
    }

    if (imageBlob) {
      if (onLoad) {
        onLoad();
      }
      const objectURL = URL.createObjectURL(imageBlob);
      return (
        <img
          src={objectURL}
          className={`relative inset-0 h-full w-full object-cover object-center ${className}`}
        />
      );
    } else {
      return isVisible ? <Spinner /> : <div />;
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-row ${className ?? ''} h-full w-full content-center ${nobackground ? '' : 'bg-slate-700'} text-slate-500`}
    >
      {content()}
    </div>
  );
}
