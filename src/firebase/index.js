// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQugj-XFZ7nJ8yjKIx2qAT5ehjZ_SnRjk",
  authDomain: "algoritme-frontend.firebaseapp.com",
  projectId: "algoritme-frontend",
  storageBucket: "algoritme-frontend.appspot.com",
  messagingSenderId: "120621837171",
  appId: "1:120621837171:web:263351b636e744b198f306"
};

export const firebase = !getApps().length ? initializeApp(firebaseConfig) : getApp()