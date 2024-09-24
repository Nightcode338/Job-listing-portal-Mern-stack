// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYfsW06n80XDFISBP-sYYAl4IYDa6gaa8",
  authDomain: "mern-job-listing-website.firebaseapp.com",
  projectId: "mern-job-listing-website",
  storageBucket: "mern-job-listing-website.appspot.com",
  messagingSenderId: "421662500616",
  appId: "1:421662500616:web:01d1c0a324c09b7a26aebd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;