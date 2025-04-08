// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAXZMkU0QJfH-b5TL8Ery8tDVemHyCCUJM",
  authDomain: "sm-clothing-37a79.firebaseapp.com",
  projectId: "sm-clothing-37a79",
  storageBucket: "sm-clothing-37a79.firebasestorage.app",
  messagingSenderId: "567864962115",
  appId: "1:567864962115:web:41274065cf094cc79a38f6",
  measurementId: "G-HE49JN7WF1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
