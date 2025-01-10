import Link from 'next/link';

interface AppStoreProps {
  mac?: boolean;
  appendix?: string;
}

export default function AppStore({ mac, appendix }: AppStoreProps) {
  if (mac) {
    return (
      <Link href="https://apps.apple.com/us/app/id1499073049" target="_blank">
        <img src="/images/MacAppStore.svg" height="40" alt="Get Echo from the App Store" />
      </Link>
    );
  }

  return (
    <Link href={`https://apps.apple.com/us/app/id1499073049` + (appendix ?? '')} target="_blank">
      <img src="/images/AppStore.svg" height="40" alt="Get Echo from the App Store" />
    </Link>
  );
}
