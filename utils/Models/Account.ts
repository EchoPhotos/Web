export interface Account {
  remoteTokens?: string[];
  deleted?: boolean;
  hasBeenOnboarded: boolean;
  requestRange?: number;
  lastKnownLocationHash6?: string;
  phoneNumber: string;
  phoneNumberLast9Digits: string;
  cachedUnreadItems?: number;
  language?: string;

  authCode?: string;
  authCodeDate?: number;

  unverifiedEmails?: string[];
  verifiedEmails?: string[];

  // Usage
  registrationDeviceType?: string;
  registrationAppStack?: string;
  lastUsedSystemName?: string;
  lastUsedSystemVersion?: string;
}

export interface IdAccount extends Account {
  id: string;
}
