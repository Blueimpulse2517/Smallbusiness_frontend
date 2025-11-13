// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwrLcQvd-xqEm_QbqdsGkbjVz3sa-iq4I",
  authDomain: "hotel-management-bdf4e.firebaseapp.com",
  projectId: "hotel-management-bdf4e",
  storageBucket: "hotel-management-bdf4e.firebasestorage.app",
  messagingSenderId: "556722931233",
  appId: "1:556722931233:web:1710e60d84bceaa21ac560"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
