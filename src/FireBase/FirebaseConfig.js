// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLWFpwqLxLDBgQdF0O3F8XMr0SCFrdseU",
  authDomain: "filebase-project-cd9fe.firebaseapp.com",
  projectId: "filebase-project-cd9fe",
  storageBucket: "filebase-project-cd9fe.appspot.com",
  messagingSenderId: "373677970708",
  appId: "1:373677970708:web:9cd965a34cbda68b475e01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);