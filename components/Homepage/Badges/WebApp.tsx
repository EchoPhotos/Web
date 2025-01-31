import Image from 'next/image';
import Link from 'next/link';

interface WebAppProps {
  inviteId: string;
}

export default function WebApp({ inviteId }: WebAppProps) {
  return (
    <Link href={`https://www.echophotos.io/invite/${inviteId}`} target="_blank">
      <Image src="/images/WebApp.svg" alt="Web App" height="40" />
    </Link>
  );
}
