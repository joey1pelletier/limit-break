// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjE1CffUqPMcUZls5DdAk3VQDOz5wDI_g",
  authDomain: "limit-break-fd922.firebaseapp.com",
  projectId: "limit-break-fd922",
  storageBucket: "limit-break-fd922.firebasestorage.app",
  messagingSenderId: "587392293560",
  appId: "1:587392293560:web:a736590602a6000689324d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();