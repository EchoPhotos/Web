const DEFAULT_API_HOST =
  process.env.NODE_ENV === 'development'
    ? 'https://echo-photos-dev.web.app/api/v1'
    : 'https://www.echophotos.io/api/v1';

export function getAPIHost() {
  return process.env.NEXT_PUBLIC_API_HOST ?? DEFAULT_API_HOST;
}

export function getInviteURL(inviteCode: string) {
  const apiHost = getAPIHost();
  const base = apiHost.replace(/\/api\/v1\/?$/, '');
  return `${base}/invite/${inviteCode}`;
}
