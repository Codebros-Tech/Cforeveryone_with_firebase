import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {auth, db} from '../config/firebase.js'; // Replace with your Firebase config import
import {addDoc, collection, doc, getDocs, query, updateDoc, where} from 'firebase/firestore';
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

export async function handleSignupWithEmailAndPassword(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch(error) {
        return error.code;
    }
}


export async function deleteUserAccount(userId) {
    // Check if the user is trying to delete themselves (avoid accidental deletion)
    if (userId === auth.currentUser.uid) {
        console.error('User cannot delete themselves. Implement confirmation step.');
        return;
    }

    // 1. Delete all code snippets posted by the user
    const codeRef = collection(db, 'codeSnippets');
    const q = query(codeRef, where('author', '==', userId));
    const querySnapshot = await getDocs(q);
    const codeToDelete = [];
    querySnapshot.forEach((doc) => {
        codeToDelete.push(doc.id);
    });

    for (const codeId of codeToDelete) {
        await deleteCode(codeId); // Reuse the existing deleteCodeSnippet function
    }

    // 2. Delete user document (optional, depending on your data structure)
    // You might have a separate users collection to store user data.
    // const userDocRef = doc(db, 'users', userId);
    // await deleteDoc(userDocRef);

    // 3. Delete user from authentication (important)
    await deleteUser(auth.currentUser); // Replace with actual user deletion logic
    console.log('User deleted successfully.');
}


export async function getAllLikes(snippetId) {
    const likesRef = collection(db, 'codeSnippets', snippetId, 'likes');
    const q = query(likesRef);
    const querySnapshot = await getDocs(q);
    const likes = [];
    querySnapshot.forEach((doc) => {
        likes.push(doc.data());
    });
    return likes;
}


export  async function fetchAllUsers() {
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
        userId: auth.currentUser.uid, // Get currently logged in user ID
        createdAt: new Date(),
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

async function getDashboardInformation() {
    // this is going to return the dashboard information to the user.
}