import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from '@utils/old/i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.info('Next.js request', {
    method: request.method,
    url: request.nextUrl.pathname,
    headers: Object.fromEntries(request.headers),
  });

  // TODO: this is maybe not needed as set in matcher (exported below)
  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (['/manifest.json', 'webmanifest', '/images', '.png', '/favicon.ico'].includes(pathname)) {
    return;
  }

  if (pathname.startsWith('/albums')) {
    return;
  }

  if (pathname.startsWith('/invites')) {
    return;
  }

  if (pathname.startsWith('/downloads')) {
    return;
  }

  if (pathname.startsWith('/test')) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
