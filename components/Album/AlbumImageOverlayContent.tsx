import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { variants } from '@utils/old/animationVariants';
import { range } from '@utils/old/range';
import * as IoIcons from 'react-icons/io5';
import { AlbumItem } from 'app/Models';
import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';
import ImageActionButtons from './ImageActionButtons';

export interface AlbumImageOverlayProps {
  index: number;
  albumItems: AlbumItem[];
  goTo: (itemIdx: number) => void;
  closeModal: () => void;
  direction?: number;
  goToNext: () => void;
  goToPrevious: () => void;
}

export default function AlbumImageOverlayContent({
  index,
  albumItems,
  goTo,
  closeModal,
  direction,
  goToNext,
  goToPrevious,
}: AlbumImageOverlayProps) {
  const [loaded, setLoaded] = useState(false);

  const filteredAlbumItems = albumItems.filter((img: AlbumItem) =>
    range(index - 15, index + 15).includes(albumItems.indexOf(img)),
  );

  if (albumItems.length <= index) {
    return null;
  }

  const item = albumItems[index];

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
  });

  useEffect(() => {
    if (item.video) {
      setLoaded(true);
    }
  }, [item.video]);

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-3/5 w-full max-w-7xl items-center bg-black/30 md:aspect-3/2"
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
                className="absolute h-full w-full"
              >
                {item.video && (
                  <div className="flex h-full w-full items-center justify-center">
                    <video
                      className="z-50 h-full"
                      controls
                      autoPlay
                      preload="auto"
                      playsInline
                      src={`/api/v1/albums/${item.group}/items/${item.image}/video`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {!item.video && (
                  <CachedImage
                    imageId={item.image}
                    format={ImageFormat.Preview}
                    onLoad={() => setLoaded(true)}
                    nobackground
                    className="h-full w-full"
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
            <div className="relative aspect-3/5 max-h-full w-full md:aspect-3/2">
              <>
                {index > 0 && (
                  <button
                    className="absolute top-[calc(50%-16px)] left-3 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-hidden"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    onClick={goToPrevious}
                  >
                    <IoIcons.IoChevronBack className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < albumItems.length && (
                  <button
                    className="absolute top-[calc(50%-16px)] right-3 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-hidden"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    onClick={goToNext}
                  >
                    <IoIcons.IoChevronForward className="h-6 w-6" />
                  </button>
                )}
              </>

              <div className="absolute top-0 right-0 p-3 text-white">
                <ImageActionButtons item={item} index={index} />
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
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-linear-to-b from-black/0 to-black/60">
            <motion.div initial={false} className="mx-auto mt-6 mb-6 flex aspect-1/1 h-14">
              <AnimatePresence initial={false}>
                {filteredAlbumItems.map((thumbnailItem) => {
                  const thumbnailIndex = albumItems.indexOf(thumbnailItem);
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
                        thumbnailIndex === index
                          ? 'z-20 rounded-md shadow-xs shadow-black/50'
                          : 'z-10'
                      } ${thumbnailIndex === 0 ? 'rounded-l-md' : ''} ${
                        thumbnailIndex === albumItems.length - 1 ? 'rounded-r-md' : ''
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-hidden`}
                    >
                      <div
                        className={`${
                          thumbnailIndex === index
                            ? 'brightness-110 hover:brightness-110'
                            : 'brightness-50 contrast-125 hover:brightness-75'
                        } h-full w-full transform object-cover transition`}
                      >
                        <CachedImage
                          imageId={thumbnailItem.image}
                          format={ImageFormat.Thumbnail}
                          nobackground
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
