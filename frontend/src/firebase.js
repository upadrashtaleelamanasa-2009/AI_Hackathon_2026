import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZNrTL-cpRrz69SiojjOgOgb8ob9BkczY",
  authDomain: "ai-dashboard-generator-fed0f.firebaseapp.com",
  projectId: "ai-dashboard-generator-fed0f",
  storageBucket: "ai-dashboard-generator-fed0f.firebasestorage.app",
  messagingSenderId: "54012513237",
  appId: "1:54012513237:web:a862d6a8efbf9fd71d0b5c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();