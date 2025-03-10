// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe3-02IT0xNj0cH6xTZ1EqOWpq5Y-JtlQ",
  authDomain: "krushifarm-ad35c.firebaseapp.com",
  projectId: "krushifarm-ad35c",
  storageBucket: "krushifarm-ad35c.firebasestorage.app",
  messagingSenderId: "1027303200742",
  appId: "1:1027303200742:web:b89e3e59247efc99472827",
  measurementId: "G-BG91VH32CV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };