// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { 
    getFirestore, doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDC_BXDy0iio5vgmgVtMjpBdST0yQ4IwSE",
  authDomain: "onboarding-portal-190ff.firebaseapp.com",
  projectId: "onboarding-portal-190ff",
  storageBucket: "onboarding-portal-190ff.firebasestorage.app",
  messagingSenderId: "274662313328",
  appId: "1:274662313328:web:d3fc2f4447e8b88b7193b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Create default fields on registration
export async function createUserProfile(uid, email) {
    await setDoc(doc(db, "users", uid), {
        email: email,
        role: "employee",
        checklistProgress: 0
    });
}
