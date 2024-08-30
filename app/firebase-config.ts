// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALJO67DnPTZr55_d9UspFkXAuwrNFP6eA",
  authDomain: "echo-photos-dev.firebaseapp.com",
  databaseURL: "https://echo-photos-dev-default-rtdb.firebaseio.com",
  projectId: "echo-photos-dev",
  storageBucket: "echo-photos-dev.appspot.com",
  messagingSenderId: "246784474922",
  appId: "1:246784474922:web:33aabdd1d5328601f66853"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
