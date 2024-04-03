import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_apiKey,
    authDomain: import.meta.env.VITE_APP_authDomain,
    projectId: import.meta.env.VITE_APP_projectId,
    storageBucket: import.meta.env.VITE_APP_storageBucket,
    messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
    appId: import.meta.env.VITE_APP_appId,
    measurementId: import.meta.env.VITE_APP_measurementId
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);