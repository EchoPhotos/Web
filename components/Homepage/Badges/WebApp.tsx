import Link from 'next/link';

interface WebAppProps {
  inviteId: string;
}

export default function WebApp({ inviteId }: WebAppProps) {
  return (
    <Link href="https://web.echophotos.io/invite/{inviteId}" target="_blank">
      <img src="/images/WebApp.svg" height="40" alt="Open the Echo Web App" />
    </Link>
  );
}
