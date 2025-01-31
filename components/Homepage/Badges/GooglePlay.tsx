import Image from 'next/image';
import Link from 'next/link';

export default function GooglePlay() {
  return (
    <Link href="https://play.google.com/store/apps/details?id=ch.echolabs.echo" target="_blank">
      <Image src="/images/GooglePlay.svg" alt="Google Play" height="50" width="200" />
    </Link>
  );
}
