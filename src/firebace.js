// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe3-02IT0xNj0cH6xTZ1EqOWpq5Y-JtlQ",
  authDomain: "krushifarm-ad35c.firebaseapp.com",
  projectId: "krushifarm-ad35c",
  storageBucket: "krushifarm-ad35c.firebasestorage.app",
  messagingSenderId: "1027303200742",
  appId: "1:1027303200742:web:b89e3e59247efc99472827",
  measurementId: "G-BG91VH32CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);