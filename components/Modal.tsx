import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { AlbumItem } from "@/utils/types";

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
  let overlayRef: any = useRef();
  const router = useRouter();

  const imageId = router.query.imageId as string;
  let albumItem = albumItems.find((item) => item.image == imageId);
  let index = 0;
  if (albumItem) {
   index = albumItems.indexOf(albumItem);
  }

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function handleClose() {
    router.push(
      {
        query: {
          id: inviteId,
        },
      },
      undefined,
      { shallow: true }
    );
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
    router.push(
      {
        query: {
          imageId: newAlbumItem.image,
          id: inviteId,
        },
      },
      undefined,
      { shallow: true }
    );
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
