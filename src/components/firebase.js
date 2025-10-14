// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth, GithubAuthProvider} from "firebase/auth"
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAu0kIvwLgLuKVI8NVgAhQTjtcPfQXfB6M",
//   authDomain: "itwalkin-web.firebaseapp.com",
//   projectId: "itwalkin-web",
//   storageBucket: "itwalkin-web.appspot.com",
//   messagingSenderId: "1083988496806",
//   appId: "1:1083988496806:web:088339e7a0331d0fc9bf67",
//   measurementId: "G-CJLHGLP9X3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth=getAuth(app);
// const provider = new GithubAuthProvider();

// export {auth, provider }
// // const analytics = getAnalytics(app);