import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwZAtgnUm4UmzpNa23QDTIFWMtbXLUJsQ",
  authDomain: "dcni-681a9.firebaseapp.com",
  projectId: "dcni-681a9",
  storageBucket: "dcni-681a9.firebasestorage.app",
  messagingSenderId: "39708742511",
  appId: "1:39708742511:web:b66f6af462b93b00be8e9a",
  measurementId: "G-XQTXVNJX61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);