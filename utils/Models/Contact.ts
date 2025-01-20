export interface Contact {
  user?: string;
  created?: number;
  owner: string;
  firstName?: string;
  lastName?: string;
  phoneNumbersLast9Digits?: string[];
  phoneNumberLast9Digits?: string;
  phoneNumber?: string;
  phoneNumbers?: string[];
  localIds?: string[];
  image?: string;
}

export interface NewContact {
  firstName?: string;
  lastName?: string;
  phoneNumbers?: string[];
  localId?: string;
}

export interface IdContact extends Contact {
  id: string;
}
