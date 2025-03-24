import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAexgSvOs0TDoKL2dyERp0pFOBB_pnwn4U",
  authDomain: "ai-interview-prep-285cc.firebaseapp.com",
  projectId: "ai-interview-prep-285cc",
  storageBucket: "ai-interview-prep-285cc.firebasestorage.app",
  messagingSenderId: "46738655801",
  appId: "1:46738655801:web:d47e0627c8a13741bf5be8",
  measurementId: "G-3Q62NKLTHJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
