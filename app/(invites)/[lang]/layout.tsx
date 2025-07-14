import NoHeaderLayout from '@components/Homepage/NoHeaderLayout';
import '@/styles/style.css';
import '@/styles/globals.css';
import { getDictionary } from '@utils/dictionary';

import { Metadata } from 'next';
import { getAlbum, getInvite } from '@utils/API';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { inviteId, lang } = await params;

  try {
    const invite = await getInvite(inviteId);

    const title = `${invite.groupName} - Echo Photos`;
    const description =
      invite.groupDescription ||
      `Join ${invite.groupName} on Echo Photos to view and share photos together.`;
    const absoluteUrl = `https://www.echophotos.io/${lang}/invites/${inviteId}`;
    const imageURL = `https://www.echophotos.io/api/v1/images/${invite.groupImage}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: absoluteUrl,
        siteName: 'Echo Photos',
        locale: lang === 'de' ? 'de_DE' : lang === 'fr' ? 'fr_FR' : 'en_US',
        type: 'website',
        images: [
          {
            url: imageURL,
            width: 1200,
            height: 630,
            alt: `Cover image for ${invite.groupName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        site: '@echophotos',
        images: [imageURL],
      },
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: absoluteUrl,
        languages: {
          en: `https://www.echophotos.io/en/invites/${inviteId}`,
          de: `https://www.echophotos.io/de/invites/${inviteId}`,
          fr: `https://www.echophotos.io/fr/invites/${inviteId}`,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Echo Photos - Photo Sharing Made Simple',
      description: 'Join Echo Photos to share and organize your photos with friends and family.',
      openGraph: {
        title: 'Echo Photos - Photo Sharing Made Simple',
        description: 'Join Echo Photos to share and organize your photos with friends and family.',
        url: 'https://www.echophotos.io',
        siteName: 'Echo Photos',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: 'https://www.echophotos.io/images/AppIcon300.png',
            width: 300,
            height: 300,
            alt: 'Echo Photos',
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params;
}) {
  const { lang } = await params;
  const dicts = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <NoHeaderLayout lang={lang} dicts={dicts}>
          {children}
        </NoHeaderLayout>
      </body>
    </html>
  );
}
