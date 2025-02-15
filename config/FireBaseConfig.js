// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "adotepet-cfc51.firebaseapp.com",
  projectId: "adotepet-cfc51",
  storageBucket: "adotepet-cfc51.firebasestorage.app",
  messagingSenderId: "954895477924",
  appId: "1:954895477924:web:a92b1890c2cd634fc08a31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)