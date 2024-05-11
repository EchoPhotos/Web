"use client";

import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { AlbumItem } from "../app/utils/types";

export default function Modal({
  items: albumItems,
  domain,
  inviteId,
  onClose,
}: {
  items: AlbumItem[];
  domain: string;
  inviteId: string;
  onClose?: () => void;
}) {
  let overlayRef = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let albumItem = albumItems.find((item) => item.image == searchParams.get("imageId"));
  let index = albumItems.indexOf(albumItem);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(pathname);
    onClose();
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
        inviteId={inviteId}
        direction={direction}
        albumItems={albumItems}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
      />
    </Dialog>
  );
}
