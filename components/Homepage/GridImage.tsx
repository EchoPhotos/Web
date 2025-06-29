import Link from 'next/link';
import * as IoIcons from 'react-icons/io5';
import { IdAlbumItem } from 'app/Models';
import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';

interface GridImageProps {
  lang: string;
  domain: string;
  inviteId: string;
  showLikes: boolean;
  albumItem: IdAlbumItem;
}

export default function GridImage(props: GridImageProps) {
  const item = props.albumItem;
  return (
    <Link
      key={item.id}
      href={`/${props.lang}/invite/${props.inviteId}?itemId=${item.id}`}
      shallow
      className="after:content after:shadow-highlight group relative block aspect-square h-full w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
    >
      <CachedImage
        className="transform rounded-lg brightness-100 transition will-change-auto group-hover:brightness-110"
        imageId={item.image}
        format={ImageFormat.Thumbnail}
        inviteId={props.inviteId}
        nobackground
      />
      {/* <Image
        alt="Album Image"
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        src={`${props.domain}/api/v1/invites/${props.inviteId}/images/${item.image}/preview`}
        width={720}
        height={480}
        unoptimized={true}
        //   sizes="(max-width: 640px) 100vw,
        // (max-width: 1280px) 50vw,
        // (max-width: 1536px) 33vw,
        // 25vw"
      /> */}
      {item.video ? (
        <div className="absolute inset-0 flex items-center justify-center text-white opacity-60 drop-shadow-xs">
          <IoIcons.IoPlay size={44} />
        </div>
      ) : (
        ''
      )}
      <div className="justify-leading items-left absolute inset-0 m-3 flex text-white drop-shadow-xs">
        {item.pinned ? <IoIcons.IoRibbon size={14} className="mr-2" /> : ''}
        {item.likes && props.showLikes ? <IoIcons.IoHeart size={14} className="mr-2" /> : ''}
      </div>
    </Link>
  );
}
