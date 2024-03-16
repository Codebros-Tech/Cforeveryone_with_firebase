import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {auth, db} from '../config/firebase.js'; // Replace with your Firebase config import
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import {deleteCode} from "./code.js";


export async function handleLoginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
        // Store user data in your application state or local storage (optional)
    } catch (error) {
        console.error('Login error:', error);
    }
}

export async function handleLoginWithEmailAndPassword(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        return error.code;
    }
}

export async function handleSignupWithEmailAndPassword(name ,email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // set the name of this user
        await updateUserProfile({
            displayName: name,
        })
        return result.user;
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
        console.log('User deleted successfully.');
    }
}


export  async function getAllUsers() {
    const usersRef = collection(db, 'users'); // Replace with your user collection name
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    querySnapshot.forEach((doc) => {
        // Consider filtering out sensitive user data before returning the user object
        users.push({ ...doc.data(), id: doc.id });
    });
    return users;
}

export async function logoutUser() {
    try {
        await signOut(auth);
        console.log('User logged out successfully.');
    } catch (error) {
        console.error('Error logging out:', error);
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
        console.log('Feedback submitted successfully.');
    } catch (error) {
        console.error('Error adding feedback:', error);
    }
}


export async function updateUserProfile(updatedFields) {
    const userRef = doc(db, 'users', auth.currentUser.uid); // Replace with your user collection name
    try {
        await updateDoc(userRef, updatedFields);
        console.log('User profile updated successfully.');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

export async function getDashboardInformation() {
    // get the total codes
    const codeRef = collection(db, 'codes');
    const userCodesQuery = query(
        codeRef,
        where('user_id', '==', auth.currentUser.uid),
    );
    const querySnapshot = await getDocs(userCodesQuery);
    const codes = [];
    querySnapshot.forEach((doc) => {
        // Consider filtering out sensitive user data before returning the user object
        codes.push({ ...doc.data(), id: doc.id });
    });
    // return codes.length;

    return {
        codes: codes.length,
    }
}