import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import downloadPhoto from "@/utils/downloadPhoto";
import { range } from "@/utils/range";
import type { AlbumItem, SharedModalProps } from "@/utils/types";
import * as IoIcons from "react-icons/io5";

export default function SharedModal({
  index,
  domain,
  albumItems: albumItems,
  invite: invite,
  changePhotoId,
  closeModal,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let filteredAlbumItems = albumItems.filter((img: AlbumItem) =>
    range(index - 15, index + 15).includes(albumItems.indexOf(img))
  );

  if (albumItems.length <= index) {
    return;
  }

  let item = albumItems[index];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < albumItems?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true
  });

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                {(() => {
                  if (item.video) {
                    return (
                      <video
                        width="1280"
                        height="853"
                        controls
                        autoPlay
                        preload="auto"
                        playsInline
                        src={`${domain}/api/v1/invites/${invite.id}/images/${item.image}/video`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    );
                  } else {
                    return (
                      <Image
                        src={`${domain}/api/v1/invites/${invite.id}/images/${item.image}/preview`}
                        width={1280}
                        height={853}
                        unoptimized={true}
                        priority
                        alt=""
                        onLoad={() => setLoaded(true)}
                      />
                    );
                  }
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              <>
                {index > 0 && (
                  <button
                    className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index - 1)}
                  >
                    <IoIcons.IoChevronBack className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < albumItems.length && (
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <IoIcons.IoChevronForward className="h-6 w-6" />
                  </button>
                )}
              </>
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                {!invite.viewOnly && <a
                  href={`${domain}/api/v1/invites/${invite.id}/images/${
                    item.image
                  }/${item.video ? "video" : "original"}`}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  target="_blank"
                  title="Open fullsize version"
                  rel="noreferrer"
                >
                  <IoIcons.IoShareOutline className="h-5 w-5" />
                </a>}
                {!invite.viewOnly && <button
                  onClick={() =>
                    downloadPhoto(
                      `${domain}/api/v1/invites/${invite.id}/images/${
                        item.image
                      }/${item.video ? "video" : "original"}`,
                      `${(invite.groupName ?? "echo-photos") + "-" + index}.${
                        item.video ? "mp4" : "jpg"
                      }`
                    )
                  }
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                  title="Download fullsize version"
                >
                  <IoIcons.IoArrowDownCircleOutline className="h-5 w-5" />
                </button>}
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  <IoIcons.IoClose className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[1/1] h-14"
            >
              <AnimatePresence initial={false}>
                {filteredAlbumItems.map((albumItem) => {
                  let id = albumItems.indexOf(albumItem);
                  return (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => changePhotoId(id)}
                      key={id}
                      className={`${
                        id === index
                          ? "z-20 rounded-md shadow shadow-black/50"
                          : "z-10"
                      } ${id === 0 ? "rounded-l-md" : ""} ${
                        id === albumItems.length - 1 ? "rounded-r-md" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <Image
                        alt="small photos on the bottom"
                        width={200}
                        height={200}
                        unoptimized={true}
                        className={`${
                          id === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={`${domain}/api/v1/invites/${invite.id}/images/${albumItem.image}/thumbnail-squared`}
                      />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
