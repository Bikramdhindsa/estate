import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-4c0ea.firebaseapp.com",
  projectId: "realestate-4c0ea",
  storageBucket: "realestate-4c0ea.appspot.com",
  messagingSenderId: "797438782728",
  appId: "1:797438782728:web:5f5ce6c0ee4ab8546250bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);