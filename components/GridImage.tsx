import Link from "next/link";
import Image from "next/image";
import { Ref } from "react";
import { AlbumItem } from "@/utils/types";

interface GridImageProps {
  lang: string;
  domain: string
  inviteId: string;
  ref?: Ref<HTMLAnchorElement>;
  albumItem: AlbumItem
}

export default function GridImage(props: GridImageProps) {
  return (
    <Link
      key={props.albumItem.image}
      href={`/${props.lang}/invite/${props.inviteId}?imageId=${props.albumItem.image}`}
      ref={props.ref}
      shallow
      className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
    >
      <Image
        alt="Album Image"
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: "translate3d(0, 0, 0)" }}
        src={`${props.domain}/api/v1/invites/${props.inviteId}/images/${props.albumItem.image}/preview`}
        width={720}
        height={480}
        unoptimized={true}
        //   sizes="(max-width: 640px) 100vw,
        // (max-width: 1280px) 50vw,
        // (max-width: 1536px) 33vw,
        // 25vw"
      />
    </Link>
  );
}
