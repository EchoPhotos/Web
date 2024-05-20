"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { AlbumItem, Invite } from "@/utils/types";

export default function Modal({
  items: albumItems,
  invite,
  domain,
  onClose,
}: {
  items: AlbumItem[];
  invite: Invite;
  domain: string;
  onClose?: () => void;
}) {
  let overlayRef: any = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let albumItem = albumItems.find((item) => item.image == searchParams.get("imageId"));
  
  let index = 0;

  if(albumItem) {
   index = albumItems.indexOf(albumItem);
  }

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(pathname);
    onClose?.();
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    const newAlbumItem = albumItems[newVal];
    setCurIndex(newVal);
    router.push(`${pathname}?${searchParams.toString()}`);
  }

  useKeypress("ArrowRight", () => {
    if (index + 1 < albumItems.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

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
      <SharedModal
        index={curIndex}
        domain={domain}
        invite={invite}
        direction={direction}
        albumItems={albumItems}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
      />
    </Dialog>
  );
}
