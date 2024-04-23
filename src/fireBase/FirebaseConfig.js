// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI9-UGJwaj8oeKMJf1cyL5pPpShXQEbmg",
  authDomain: "zingmp3-md6.firebaseapp.com",
  projectId: "zingmp3-md6",
  storageBucket: "zingmp3-md6.appspot.com",
  messagingSenderId: "204523510752",
  appId: "1:204523510752:web:f2b1fe97f5307b82b46985",
  measurementId: "G-GNBQVQNE69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);