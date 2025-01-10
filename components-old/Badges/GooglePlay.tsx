import Link from 'next/link';

export default function GooglePlay() {
  return (
    <Link href="https://play.google.com/store/apps/details?id=ch.echolabs.echo" target="_blank">
      <img src="/images/GooglePlay.svg" alt="Get Echo on Google Play" />
    </Link>
  );
}
