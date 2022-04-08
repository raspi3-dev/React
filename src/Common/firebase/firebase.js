// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBbJ4s9FNMrpr3zg2-ks8Nj8XMH0w_DF6c",
  authDomain: "test1-b9306.firebaseapp.com",
  projectId: "test1-b9306",
  storageBucket: "test1-b9306.appspot.com",
  messagingSenderId: "718102931855",
  appId: "1:718102931855:web:ee244bb4a733ab296f03fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
