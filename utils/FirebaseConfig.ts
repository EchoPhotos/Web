'use client';

import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfigDev: FirebaseOptions = {
  apiKey: 'AIzaSyALJO67DnPTZr55_d9UspFkXAuwrNFP6eA',
  authDomain: 'echo-photos-dev.firebaseapp.com',
  databaseURL: 'https://echo-photos-dev-default-rtdb.firebaseio.com',
  projectId: 'echo-photos-dev',
  storageBucket: 'echo-photos-dev.appspot.com',
  messagingSenderId: '246784474922',
  appId: '1:246784474922:web:b84e8843d8d4762df66853',
};

const firebaseConfigProd: FirebaseOptions = {
  apiKey: 'AIzaSyArth3HcZgLI3HBVXZfbkRxedyKBfu6z2c',
  authDomain: 'echo-photos.firebaseapp.com',
  databaseURL: 'https://echo-photos-default-rtdb.firebaseio.com',
  projectId: 'echo-photos',
  storageBucket: 'echo-photos.appspot.com',
  messagingSenderId: '962144839051',
  appId: '1:962144839051:web:6fefcc52ab146daf37fb8e',
};

function currentConfig() {
  if (process.env.NODE_ENV === 'development') {
    return firebaseConfigDev;
  }
  return firebaseConfigProd;
}

const app = initializeApp(currentConfig());

const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth, app };
