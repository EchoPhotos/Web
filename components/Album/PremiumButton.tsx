'use client';

import Spinner from '@components/UI/Spinner';
import { getCheckoutURL } from '@utils/API';
import { IdAlbum } from '@utils/Models';
import { Button } from '@headlessui/react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ActionStyle } from '@components/UI/ButtonStyles';

export function PremiumButton({ album }: { album: IdAlbum }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promoCode = searchParams.get('promoCode') ?? undefined;
  const pathname = usePathname();

  if (!album.premium) {
    return (
      <Button
        onClick={async () => {
          setLoading(true);
          const checkoutURL = await getCheckoutURL(album.id, promoCode, pathname);
          router.push(checkoutURL);
        }}
      >
        {loading && (
          <div className="h-4">
            <Spinner />
          </div>
        )}
        {!loading && <ActionStyle>Upgrade now</ActionStyle>}
      </Button>
    );
  }
}
