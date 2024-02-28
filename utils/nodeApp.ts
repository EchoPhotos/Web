import * as admin from "firebase-admin";

if (!admin.apps.length) {
    console.log("Initializing Node Firebase App!")
  admin.initializeApp();
}

export default admin;
