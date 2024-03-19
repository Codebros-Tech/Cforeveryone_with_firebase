import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAl2V3nnPV1n_d2EE83e7U_YArDvHe07aE",
    authDomain: "cforeveryone-1c553-79a37.firebaseapp.com",
    projectId: "cforeveryone-1c553",
    storageBucket: "cforeveryone-1c553.appspot.com",
    messagingSenderId: "665997534862",
    appId: "1:665997534862:web:b7ca29d3a95bae7a534bdf",
    measurementId: "G-TZLLGBTYJP"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);

export const db = getFirestore(app);