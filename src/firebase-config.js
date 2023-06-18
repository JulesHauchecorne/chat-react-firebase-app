import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIqkd2oX_2gC96RzMfwROBds9q9zokA-0",
  authDomain: "chat-react-firebase-3f0a1.firebaseapp.com",
  projectId: "chat-react-firebase-3f0a1",
  storageBucket: "chat-react-firebase-3f0a1.appspot.com",
  messagingSenderId: "195734430687",
  appId: "1:195734430687:web:f115307fcd4bd3cdd25a6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
