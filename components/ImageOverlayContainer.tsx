"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import ImageOverlay from "./ImageOverlay";
import { AlbumItem, Invite } from "@/utils/types";

export default function ImageOverlayContainer({
  items: albumItems,
  invite,
  domain,
  onClose,
}: {
  items: AlbumItem[];
  invite: Invite;
  domain: string;
  onClose: (string) => void;
}) {
  let overlayRef: any = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let albumItem = albumItems.find(
    (item) => item.id == searchParams.get("itemId")
  );

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

  useKeypress("ArrowRight", goToNext);

  useKeypress("ArrowLeft", goToPrevious);

  return (
    <Dialog
      static
      open={true}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
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
