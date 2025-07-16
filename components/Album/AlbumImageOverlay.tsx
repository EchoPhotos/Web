'use client';

import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { KeyboardEvent, useRef, useState } from 'react';
import { AlbumItem } from 'app/Models';
import AlbumImageOverlayContent from './AlbumImageOverlayContent';

export default function AlbumImageOverlay({
  items,
  selectedItemId,
}: {
  items: AlbumItem[];
  selectedItemId: string;
}) {
  const overlayRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const albumItem = items.find((item) => item.id === selectedItemId);
  
  let index = 0;
  if (albumItem) {
    index = items.indexOf(albumItem);
  }

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(pathname);
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }

    setCurIndex(newVal);
    router.push(`${pathname}?item=${items[newVal].id}`);
  }

  function goToNext() {
    if (index + 1 < items.length) {
      changePhotoId(index + 1);
    }
  }

  function goToPrevious() {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      goToNext();
    } else if (event.key === 'ArrowLeft') {
      goToPrevious();
    }
  }

  if (!albumItem) {
    return null;
  }

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      onKeyDown={handleKey}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <motion.div
        ref={overlayRef}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <AlbumImageOverlayContent
        index={curIndex}
        direction={direction}
        albumItems={items}
        goTo={changePhotoId}
        closeModal={handleClose}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
      />
    </Dialog>
  );
}