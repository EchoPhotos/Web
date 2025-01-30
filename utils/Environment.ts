import { app } from './FirebaseConfig';

export function getAPIHost() {
  return 'http://127.0.0.1:5001/echo-photos-dev/europe-west6/apiV1/api/v1';

  if (process.env.NODE_ENV === 'development' || app.options.projectId === 'echo-photos-dev') {
    return 'https://echo-photos-dev.web.app/api/v1';
  } else {
    return 'https://www.echophotos.io/api/v1';
  }
}

export function getInviteURL(inviteCode: string) {
  if (process.env.NODE_ENV === 'development' || app.options.projectId === 'echo-photos-dev') {
    return `https://echo-photos-dev.web.app/invite/${inviteCode}`;
  } else {
    return `https://www.echophotos.io/invite/${inviteCode}`;
  }
}
