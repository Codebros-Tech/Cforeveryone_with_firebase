import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {auth, db} from '../config/firebase.js';
import {addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where} from 'firebase/firestore';
import { updateProfile} from 'firebase/auth';
import {deleteCode} from "./code.js";

export async function getDashboardInformation(userId) {
    try {
        const codeRef = collection(db, 'codes');
        const userCodesQuery = query(codeRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(userCodesQuery);
        if (querySnapshot.empty) {
            console.log("no codes with that userId");
        }
        const codes = [];
        querySnapshot.forEach((doc) => {
            codes.push({ ...doc.data(), id: doc.id });
        });

        return {
            codes: codes.length,
        };

    } catch (error) {
        console.log('error ', error, ' occurred');
        return [];
    }
}

export async function handleLoginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        return user;
    } catch (error) {
        console.error('Login error:', error);
    }
}

export function handleLoginWithEmailAndPassword(email, password) {
    try {
        let user;
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            user = result.user;
        });
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function handleSignupWithEmailAndPassword(name, email, password) {
    try {
        let user;
        createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
            user = result.user;
            const profileUpdates = {displayName: name};
            await updateProfile(auth.currentUser, profileUpdates);
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                timestamp: serverTimestamp(),
                password: password,
            });
        });

        return user;
    } catch(error) {
        return error.code;
    }
}


export async function deleteUserAccount(userId) {
    if (userId === auth.currentUser.uid) {
        const codeRef = collection(db, 'codes');
        const q = query(codeRef, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);
        const codeToDelete = [];
        querySnapshot.forEach((doc) => {
            codeToDelete.push(doc.id);
        });

        for (const codeId of codeToDelete) {
            await deleteCode(codeId); // Reuse the existing deleteCodeSnippet function
        }

        const userRef = collection(db, 'users', userId);
        await deleteDoc(userRef);
    }
}


export  async function getAllUsers() {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    });
    return users;
}

export async function logoutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}

export  async function addFeedback(feedbackText) {
    const feedbackRef = collection(db, 'feedback'); // Replace with your feedback collection name
    const data = {
        text: feedbackText,
        user_id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        created_at: new Date(),
    };
    try {
        await addDoc(feedbackRef, data);
    } catch (error) {
        console.error('Error adding feedback:', error);
    }
}