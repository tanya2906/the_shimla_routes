// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-48M4IZPh-hJhaKSdWKAOhgLXQ5Dl5Z4",
    authDomain: "the-shimla-routes.firebaseapp.com",
   
    projectId: "the-shimla-routes",
    storageBucket: "the-shimla-routes.appspot.com",
    messagingSenderId: "643174245588",
    appId: "1:643174245588:web:99fd4daaed65e073818741",
    measurementId:"G-P84KZ9XD5H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);


