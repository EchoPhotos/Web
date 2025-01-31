import { getIdToken } from 'firebase/auth';
import { auth } from './FirebaseConfig';

export async function getToken(): Promise<string | undefined> {
  const user = auth.currentUser;
  if (user) {
    return await getIdToken(user);
  }
  return undefined;
}
