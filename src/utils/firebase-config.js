
import { initializeApp } from "firebase/app";
import {getAuth}from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDkBckgAMNqGN1U05kx0soC50qrMJbIeYo",
  authDomain: "react-watch-clone.firebaseapp.com",
  projectId: "react-watch-clone",
  storageBucket: "react-watch-clone.appspot.com",
  messagingSenderId: "562749949660",
  appId: "1:562749949660:web:2308a3c4391ce0c2b7d619",
  measurementId: "G-GEJ64XB2NN"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);