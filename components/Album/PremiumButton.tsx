'use client';

import Spinner from '@components/UI/Spinner';
import { getCheckoutURL } from '@utils/API';
import { Album } from 'app/Models';
import { Button } from '@headlessui/react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function PremiumButton({ album }: { album: Album }) {
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
        className="btn btn-primary"
      >
        {loading && (
          <div className="h-6">
            <div className="h-6 scale-50">
              <Spinner />
            </div>
          </div>
        )}
        {!loading && <div>Upgrade now</div>}
      </Button>
    );
  }
}
