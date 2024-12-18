import Link from "next/link";
import Image from "next/image";
import { AlbumItem } from "@/utils/types";
import * as IoIcons from "react-icons/io5";

interface GridImageProps {
  lang: string;
  domain: string;
  inviteId: string;
  showLikes: boolean;
  albumItem: AlbumItem;
}

export default function GridImage(props: GridImageProps) {
  const item = props.albumItem;
  return (
    <Link
      key={item.id}
      href={`/${props.lang}/invite/${props.inviteId}?itemId=${item.id}`}
      shallow
      className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
    >
      <Image
        alt="Album Image"
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: "translate3d(0, 0, 0)" }}
        src={`${props.domain}/api/v1/invites/${props.inviteId}/images/${item.image}/preview`}
        width={720}
        height={480}
        unoptimized={true}
        //   sizes="(max-width: 640px) 100vw,
        // (max-width: 1280px) 50vw,
        // (max-width: 1536px) 33vw,
        // 25vw"
      />
      {item.video ? (
        <div className="absolute inset-0 m-6 flex justify-center text-white drop-shadow-sm items-center">
          <IoIcons.IoPlay size={33} />
        </div>
      ) : (
        ""
      )}
      <div className="absolute inset-0 m-6 flex justify-leading text-white drop-shadow-sm items-left">
        {item.pinned ? <IoIcons.IoRibbon size={14} className="mr-2" /> : ""}
        {item.likes && props.showLikes ? (
          <IoIcons.IoHeart size={14} className="mr-2" />
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
