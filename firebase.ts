// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN25SFCllfcY8oAjH9Bvma3UqObsMG258",
  authDomain: "spydex-7cbed.firebaseapp.com",
  projectId: "spydex-7cbed",
  storageBucket: "spydex-7cbed.appspot.com",
  messagingSenderId: "1014362247651",
  appId: "1:1014362247651:web:f6689dd5f09fa38fd2d0d6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
export default app;
export { auth, db };
