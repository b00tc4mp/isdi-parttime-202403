// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFURHRvAIcM7bCUY2uolWTCbd17NfdQIk",
  authDomain: "gestion-empresa-de-residuos.firebaseapp.com",
  projectId: "gestion-empresa-de-residuos",
  storageBucket: "gestion-empresa-de-residuos.appspot.com",
  messagingSenderId: "786562204382",
  appId: "1:786562204382:web:b1137dc7b10d64d194b84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)