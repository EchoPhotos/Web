import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe__6GzzycZ8DhrZvmfkVobsfBPhuZVNw",
  authDomain: "echo-photos-dev.firebaseapp.com",
  databaseURL: "https://echo-photos-dev-default-rtdb.firebaseio.com",
  projectId: "echo-photos-dev",
  storageBucket: "echo-photos-dev.appspot.com",
  messagingSenderId: "246784474922",
  appId: "1:246784474922:web:4d8bada54790443ef66853"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
