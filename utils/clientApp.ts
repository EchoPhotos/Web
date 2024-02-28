import { initializeApp, getApps, getApp } from "firebase/app";

export const getFirebaseApp = () => {
  const clientCredentials = {
    apiKey: "AIzaSyALJO67DnPTZr55_d9UspFkXAuwrNFP6eA",
    authDomain: "echo-photos-dev.firebaseapp.com",
    databaseURL: "https://echo-photos-dev-default-rtdb.firebaseio.com",
    projectId: "echo-photos-dev",
    storageBucket: "echo-photos-dev.appspot.com",
    messagingSenderId: "246784474922",
    appId: "1:246784474922:web:b84e8843d8d4762df66853"
  };

  const apps = getApps();
  if (apps.length <= 0) {
    console.trace();
    console.log("Initializing Firebase App!")
    const app = initializeApp(clientCredentials);
    return app;
  } else {
    return apps[0];
  }
};
