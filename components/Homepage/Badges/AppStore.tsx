import Image from 'next/image';
import Link from 'next/link';

interface AppStoreProps {
  mac?: boolean;
  appendix?: string;
}

export default function AppStore({ mac, appendix }: AppStoreProps) {
  if (mac) {
    return (
      <Link href="https://apps.apple.com/us/app/id1499073049" target="_blank">
        <Image src="/images/MacAppStore.svg" alt="Mac App Store" height="20" width="140" />
      </Link>
    );
  }

  return (
    <Link href={`https://apps.apple.com/us/app/id1499073049` + (appendix ?? '')} target="_blank">
      <Image src="/images/AppStore.svg" alt="App Store" height="20" width="140" />
    </Link>
  );
}
