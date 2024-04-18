import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLWFpwqLxLDBgQdF0O3F8XMr0SCFrdseU",
    authDomain: "filebase-project-cd9fe.firebaseapp.com",
    projectId: "filebase-project-cd9fe",
    storageBucket: "filebase-project-cd9fe.appspot.com",
    messagingSenderId: "373677970708",
    appId: "1:373677970708:web:9cd965a34cbda68b475e01"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)