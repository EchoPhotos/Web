export interface User {
  username?: string;
  name: string;
  status: string;
  image?: string;
  disabled?: boolean;
  firstLogin: number;
  lastLogin: number; // Simply last time online, not login
  blockedUsers?: string[];
}

export interface IdUser extends User {
  id: string;
}
