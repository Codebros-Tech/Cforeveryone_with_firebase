import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {auth, db} from '../config/firebase.js';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where
} from 'firebase/firestore';
import {deleteCode} from "./code.js";

export async function deleteUserAccount(userId) {
    if (userId === auth.currentUser.uid) {
        const codeRef = collection(db, 'codes');
        const q = query(codeRef, where('userId', '==', userId));
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

export async function getUserById(id) {
    try {
        if (!id) {
            console.error('empty id passed');
        } else {
            const userDoc = await getDoc(doc(db, 'users', id))
            return userDoc.data();
        }
    } catch (error) {
        console.log(error);
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

export async function addFeedback(user, feedbackText) {
    const feedbackRef = collection(db, 'feedback');
    const data = {
        text: feedbackText,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };
    try {
        return await addDoc(feedbackRef, data);
    } catch (error) {
        console.error('Error adding feedback:', error);
    }
}

export async function handleLoginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await storeUserInformation(user);
    } catch (error) {
        console.error('Login error:', error);
    }
}

export async function storeUserInformation(user) {
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                displayName: user.displayName,
                email: user.email,
                createdAt: user.createdAt || serverTimestamp(),
                photoURL: user.photoURL,
                lastLogin: user.lastLoginAt || serverTimestamp(),
                emailVerified: user.emailVerified,
            });
        }
    } catch (error) {
        console.error(" Error Storing user information ", error);
    }
}