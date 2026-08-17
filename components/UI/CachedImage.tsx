import { imageURL } from '@utils/API';
import { getToken } from '@utils/Auth';
import { ImageFormat, useImageCache } from '@utils/ImageCache';
import { useEffect, useState, useRef } from 'react';
import Spinner from './Spinner';
import { IoImage } from 'react-icons/io5';

const imageRequests = new Map<string, Promise<Blob>>();

function fetchImage(imageId: string, format: ImageFormat, imageUrl: string): Promise<Blob> {
  const key = `${imageId}_${ImageFormat[format]}`;
  const existing = imageRequests.get(key);
  if (existing) {
    return existing;
  }

  const request = getToken()
    .then((token) =>
      fetch(imageUrl, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }),
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.status}`);
      }
      return response.blob();
    })
    .finally(() => {
      imageRequests.delete(key);
    });

  imageRequests.set(key, request);
  return request;
}

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
  const { imageBlob, cacheState, setImageBlob } = useImageCache(imageId, format);
  const [isVisible, setIsVisible] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [objectURL, setObjectURL] = useState<string>();
  const imageUrl = imageURL(imageId, format, inviteId);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  useEffect(() => {
    setLoadFailed(false);
  }, [imageUrl]);

  useEffect(() => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      setObjectURL(url);
      onLoadRef.current?.();
      return () => URL.revokeObjectURL(url);
    }
    setObjectURL(undefined);
  }, [imageBlob]);

  useEffect(() => {
    if (cacheState !== 'miss' || !isVisible || !imageId || loadFailed) return;

    let cancelled = false;

    fetchImage(imageId, format, imageUrl)
      .then((blob) => {
        if (!cancelled) {
          void setImageBlob(blob);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error('Error loading image:', error);
          setLoadFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [cacheState, format, imageId, imageUrl, isVisible, loadFailed, setImageBlob]);

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

    if (loadFailed) {
      return <IoImage className="m-auto" size={33} />;
    }

    if (objectURL) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={objectURL}
          className={`relative inset-0 h-full w-full object-contain object-center ${className}`}
          alt={imageId}
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
