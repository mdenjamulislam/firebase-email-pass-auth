// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzr5yxeHOTvlCIXtUBJYCzxvqWfaSpyVs",
  authDomain: "fir-email-pass-auth-36d5a.firebaseapp.com",
  projectId: "fir-email-pass-auth-36d5a",
  storageBucket: "fir-email-pass-auth-36d5a.appspot.com",
  messagingSenderId: "1007982786159",
  appId: "1:1007982786159:web:f62bd0edd39dea53d8ff9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;