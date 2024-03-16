import { signInWithPopup, GoogleAuthProvider, signOut  } from 'firebase/auth';
import { auth } from '../config/firebase.js'; // Replace with your Firebase config import
import { deleteUser, doc, getDocs, collection, deleteDoc, query, where, updateDoc  } from 'firebase/firestore';


async function handleLogin() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Logged in user:', user);
        // Store user data in your application state or local storage (optional)
    } catch (error) {
        console.error('Login error:', error);
    }
}


async function deleteUserAccount(userId) {
    // Check if the user is trying to delete themselves (avoid accidental deletion)
    if (userId === auth.currentUser.uid) {
        console.error('User cannot delete themselves. Implement confirmation step.');
        return;
    }

    // 1. Delete all code snippets posted by the user
    const codeRef = collection(db, 'codeSnippets');
    const q = query(codeRef, where('author', '==', userId));
    const querySnapshot = await getDocs(q);
    const snippetsToDelete = [];
    querySnapshot.forEach((doc) => {
        snippetsToDelete.push(doc.id);
    });

    for (const snippetId of snippetsToDelete) {
        await deleteCodeSnippet(snippetId); // Reuse the existing deleteCodeSnippet function
    }

    // 2. Delete user document (optional, depending on your data structure)
    // You might have a separate users collection to store user data.
    // const userDocRef = doc(db, 'users', userId);
    // await deleteDoc(userDocRef);

    // 3. Delete user from authentication (important)
    await deleteUser(auth.currentUser); // Replace with actual user deletion logic
    console.log('User deleted successfully.');
}


async function getAllLikes(snippetId) {
    const likesRef = collection(db, 'codeSnippets', snippetId, 'likes');
    const q = query(likesRef);
    const querySnapshot = await getDocs(q);
    const likes = [];
    querySnapshot.forEach((doc) => {
        likes.push(doc.data());
    });
    return likes;
}


async function fetchAllUsers() {
    const usersRef = collection(db, 'users'); // Replace with your user collection name
    const querySnapshot = await getDocs(usersRef);
    const users = [];
    querySnapshot.forEach((doc) => {
        // Consider filtering out sensitive user data before returning the user object
        users.push({ ...doc.data(), id: doc.id });
    });
    return users;
}

async function logoutUser() {
    try {
        await signOut(auth);
        console.log('User logged out successfully.');
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

async function addFeedback(feedbackText) {
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


async function updateUserProfile(updatedFields) {
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