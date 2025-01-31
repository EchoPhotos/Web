'use client';

import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { KeyboardEvent, useRef, useState } from 'react';
import ImageOverlay from './ImageOverlay';
import { IdAlbumItem, IdInvite } from '@Shared/Models';

export default function ImageOverlayContainer({
  items: albumItems,
  invite,
  domain,
  onClose,
}: {
  items: IdAlbumItem[];
  invite: IdInvite;
  domain: string;
  onClose: (string) => void;
}) {
  const overlayRef: any = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const albumItem = albumItems.find((item) => item.id == searchParams.get('itemId'));

  let index = 0;

  if (albumItem) {
    index = albumItems.indexOf(albumItem);
  }

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(pathname);
    onClose(albumItems[curIndex].id);
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }

    setCurIndex(newVal);
    router.push(`${pathname}?itemId=${albumItems[newVal].id}`);
  }

  function goToNext() {
    if (index + 1 < albumItems.length) {
      changePhotoId(index + 1);
    }
  }

  function goToPrevious() {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key == 'ArrowRight') {
      goToNext();
    } else if (event.key == 'ArrowLeft') {
      goToPrevious();
    }
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
      <ImageOverlay
        index={curIndex}
        domain={domain}
        invite={invite}
        direction={direction}
        albumItems={albumItems}
        goTo={changePhotoId}
        closeModal={handleClose}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
      />
    </Dialog>
  );
}
