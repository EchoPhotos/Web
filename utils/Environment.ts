import { app } from './FirebaseConfig';

export function getAPIHost() {
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
