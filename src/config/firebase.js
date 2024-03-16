// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAl2V3nnPV1n_d2EE83e7U_YArDvHe07aE",
    authDomain: "cforeveryone-1c553-79a37.firebaseapp.com",
    projectId: "cforeveryone-1c553",
    storageBucket: "cforeveryone-1c553.appspot.com",
    messagingSenderId: "665997534862",
    appId: "1:665997534862:web:b7ca29d3a95bae7a534bdf",
    measurementId: "G-TZLLGBTYJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);