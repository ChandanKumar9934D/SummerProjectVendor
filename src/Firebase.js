// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrvgfEq-m18aRGzV2wXBDIJc4AIx5V2ZY",
  authDomain: "vendorease.firebaseapp.com",
  projectId: "vendorease",
  storageBucket: "vendorease.appspot.com",
  messagingSenderId: "446875425146",
  appId: "1:446875425146:web:8f7d736319337e44d3dec3",
  measurementId: "G-KZBXKWRGX7" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth = getAuth(app);

const storage=getStorage(app)
export{app,analytics,db,auth,storage}