import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { variants } from '@utils/old/animationVariants';
import downloadPhoto from '@utils/old/downloadPhoto';
import { range } from '@utils/old/range';
import * as IoIcons from 'react-icons/io5';
import { IdAlbumItem, IdInvite } from '@Shared/Models';
import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';

/* eslint-disable no-unused-vars */
export interface SharedModalProps {
  index: number;
  domain: string;
  invite: IdInvite;
  albumItems: IdAlbumItem[];
  currentPhoto?: string;
  goTo: (itemIdx: number) => void;
  closeModal: () => void;
  direction?: number;
  goToNext: () => void;
  goToPrevious: () => void;
}

export default function ImageOverlay({
  index,
  domain,
  albumItems,
  invite,
  goTo,
  closeModal,
  direction,
  goToNext,
  goToPrevious,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let filteredAlbumItems = albumItems.filter((img: IdAlbumItem) =>
    range(index - 15, index + 15).includes(albumItems.indexOf(img)),
  );

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
  });

  if (albumItems.length <= index) {
    return;
  }

  let item = albumItems[index];

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center"
        {...handlers}
      >
        <div className="w-full overflow-hidden">
          <div className="flex items-center justify-center bg-black">
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
                {item.video && (
                  <div className='flex items-center justify-center h-screen w-screen'>
                    <video
                      className="h-4/5"
                      width="800"
                      height="500"
                      controls
                      autoPlay
                      preload="auto"
                      playsInline
                      src={`${domain}/api/v1/invites/${invite.id}/images/${item.image}/video`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {!item.video && (
                  <CachedImage
                    imageId={item.image}
                    inviteId={invite.id}
                    format={ImageFormat.Preview}
                    onLoad={() => setLoaded(true)}
                    nobackground={true}
                  />
                )}
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
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    onClick={goToPrevious}
                  >
                    <IoIcons.IoChevronBack className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < albumItems.length && (
                  <button
                    className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    onClick={goToNext}
                  >
                    <IoIcons.IoChevronForward className="h-6 w-6" />
                  </button>
                )}
              </>

              <div className="absolute right-0 top-0 flex items-center gap-2 p-3 text-white">
                {!invite.viewOnly && (
                  <a
                    href={`${domain}/api/v1/invites/${invite.id}/images/${
                      item.image
                    }/${item.video ? 'video' : 'original'}`}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    <IoIcons.IoShareOutline className="h-5 w-5" />
                  </a>
                )}
                {!invite.viewOnly && (
                  <button
                    onClick={() =>
                      downloadPhoto(
                        `${domain}/api/v1/invites/${invite.id}/images/${
                          item.image
                        }/${item.video ? 'video' : 'original'}`,
                        `${(invite.groupName ?? 'echo-photos') + '-' + index}.${
                          item.video ? 'mp4' : 'jpg'
                        }`,
                      )
                    }
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    title="Download fullsize version"
                  >
                    <IoIcons.IoArrowDownCircleOutline className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="absolute left-0 top-0 flex items-center gap-2 p-3 text-white">
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
            <motion.div initial={false} className="mx-auto mb-6 mt-6 flex aspect-[1/1] h-14">
              <AnimatePresence initial={false}>
                {filteredAlbumItems.map((thumbnailItem) => {
                  let thumbnailIndex = albumItems.indexOf(thumbnailItem);
                  return (
                    <motion.button
                      initial={{
                        width: '0%',
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: thumbnailIndex === index ? 1.25 : 1,
                        width: '100%',
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: '0%' }}
                      onClick={() => goTo(thumbnailIndex)}
                      key={thumbnailItem.id}
                      className={`${
                        thumbnailIndex === index ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10'
                      } ${thumbnailIndex === 0 ? 'rounded-l-md' : ''} ${
                        thumbnailIndex === albumItems.length - 1 ? 'rounded-r-md' : ''
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <div
                        className={`${
                          thumbnailIndex === index
                            ? 'brightness-110 hover:brightness-110'
                            : 'brightness-50 contrast-125 hover:brightness-75'
                        } h-full transform object-cover transition`}
                      >
                        <CachedImage
                          imageId={thumbnailItem.image}
                          inviteId={invite.id}
                          format={ImageFormat.Thumbnail}
                          nobackground={true}
                        />
                      </div>
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
