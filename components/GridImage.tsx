import Link from "next/link";
import Image from "next/image";
import { Ref } from "react";

interface GridImageProps {
  id: string;
  href: string;
  src: string;
  ref?: Ref<HTMLAnchorElement>;
}

export default function GridImage({id, href, src, ref}: GridImageProps) {

  return (
    <div
      key={id}
      // href={`/?photoId=${imageId}`}
      // as={`/p/${imageId}`}
      // shallow
      className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
    >
      <Link
        key={id}
        href={href}
        ref={ref}
        shallow
        className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Image
          alt="Album Image"
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          src={src}
          width={720}
          height={480}
          unoptimized={true}
          //   sizes="(max-width: 640px) 100vw,
          // (max-width: 1280px) 50vw,
          // (max-width: 1536px) 33vw,
          // 25vw"
        />
      </Link>
    </div>
  );
};
