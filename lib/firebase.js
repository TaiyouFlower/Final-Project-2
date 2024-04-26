// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDv3LaLLzbAeFJubuf96LO7SWOjT3NAyZ0",
  authDomain: "movies-8aa96.firebaseapp.com",
  projectId: "movies-8aa96",
  storageBucket: "movies-8aa96.appspot.com",
  messagingSenderId: "529505553333",
  appId: "1:529505553333:web:7c3ff45f981b41941027fc",
  measurementId: "G-WVKGZGQN9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
