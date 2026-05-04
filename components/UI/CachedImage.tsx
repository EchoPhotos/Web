import { ImageFormat, useImageCache } from '@utils/ImageCache';
import { loadImageBlob } from '@utils/ImageLoader';
import { useEffect, useRef, useState } from 'react';
import { IoImage } from 'react-icons/io5';

export default function CachedImage({
  imageId,
  inviteId,
  format,
  onLoad,
  className,
  nobackground,
  eager = false,
  rootMargin = '400px',
}: {
  imageId?: string;
  inviteId?: string;
  format: ImageFormat;
  onLoad?: () => void;
  className?: string;
  nobackground?: boolean;
  eager?: boolean;
  rootMargin?: string;
}) {
  const [imageBlob, setImageBlob] = useImageCache(imageId, format);
  const [isVisible, setIsVisible] = useState(eager);
  const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);
  const [hasLoadedImage, setHasLoadedImage] = useState(() => Boolean(imageBlob));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasReportedLoadRef = useRef(false);
  const previousBlobRef = useRef<Blob | undefined>(imageBlob);

  useEffect(() => {
    if (imageBlob || !isVisible || !imageId) return;

    let isCancelled = false;

    loadImageBlob({
      imageId,
      inviteId,
      format,
    })
      .then((blob) => {
        if (!blob || isCancelled) {
          return;
        }

        if (!imageBlob) {
          setImageBlob(blob);
        }
      })
      .catch((error) => {
        console.error('Error loading image:', error);
      });

    return () => {
      isCancelled = true;
    };
  }, [format, imageBlob, imageId, inviteId, isVisible, setImageBlob]);

  useEffect(() => {
    if (previousBlobRef.current !== imageBlob) {
      previousBlobRef.current = imageBlob;
      setHasLoadedImage(false);
      hasReportedLoadRef.current = false;
    }

    if (!imageBlob) {
      setObjectUrl(undefined);
      return;
    }

    const nextObjectUrl = URL.createObjectURL(imageBlob);
    setObjectUrl(nextObjectUrl);

    return () => {
      URL.revokeObjectURL(nextObjectUrl);
    };
  }, [imageBlob]);

  useEffect(() => {
    if (eager) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin },
    );

    const element = containerRef.current;
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [eager, rootMargin]);

  function handleLoad() {
    if (hasReportedLoadRef.current) {
      return;
    }

    hasReportedLoadRef.current = true;
    setHasLoadedImage(true);
    onLoad?.();
  }

  function content() {
    if (!imageId) {
      return <IoImage className="m-auto" size={33} />;
    }

    if (objectUrl) {
      return (
        <>
          {!hasLoadedImage && (
            <div
              aria-hidden="true"
              className={`absolute inset-0 ${nobackground ? 'bg-white/5' : 'bg-slate-700'} motion-safe:animate-pulse`}
            />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={objectUrl}
            className={`relative inset-0 h-full w-full object-contain object-center transition-opacity duration-200 ${
              hasLoadedImage ? 'opacity-100' : 'opacity-0'
            } ${className ?? ''}`}
            alt={imageId}
            onLoad={handleLoad}
            decoding="async"
          />
        </>
      );
    } else {
      return (
        <div
          aria-hidden="true"
          className={`h-full w-full ${nobackground ? 'bg-white/5' : 'bg-slate-700'} ${
            isVisible ? 'motion-safe:animate-pulse' : ''
          }`}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full content-center items-center justify-center overflow-hidden ${
        className ?? ''
      } ${nobackground ? '' : 'bg-slate-700'} text-slate-500`}
    >
      {content()}
    </div>
  );
}
