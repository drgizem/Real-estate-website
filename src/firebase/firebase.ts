// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABtb7j6qlUOfKmLaxcEqKsSqCPC_We5Mw",
  authDomain: "estate-89151-1d64f.firebaseapp.com",
  projectId: "estate-89151",
  storageBucket: "estate-89151.appspot.com",
  messagingSenderId: "51311985776",
  appId: "1:51311985776:web:60f9c02ecfbf2a61b720b5",
  measurementId: "G-0X8FP0EBTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);