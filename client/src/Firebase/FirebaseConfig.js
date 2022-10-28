import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "phone-auth-75ec3.firebaseapp.com",
    projectId: "phone-auth-75ec3",
    storageBucket: "phone-auth-75ec3.appspot.com",
    messagingSenderId: "564092901380",
    appId: "1:564092901380:web:093d5242e44ab414c7fd51"
  };
  
export const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);