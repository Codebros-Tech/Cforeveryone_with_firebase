import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase.js'; // Replace with your Firebase config import
import { collection, getDocs, query, doc, where, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js'; // Replace with your Firebase config import

export async function getAllCodes() {
    const codeRef = collection(db, 'codeSnippets');
    const q = query(codeRef); // Optional: Add filtering or ordering based on needs
    const querySnapshot = await getDocs(q);
    const snippets = [];
    querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
    });
    return snippets;
}


export async function postCodeSnippet(code, title, description) {
    const codeRef = collection(db, 'code');
    const data = {
        code: code,
        title: title,
        description: description,
        author: auth.currentUser.uid, // Get currently logged in user ID
        createdAt: new Date(),
    };
    try {
        const docRef = await addDoc(codeRef, data);
        console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export async function getCodeSnippetById(snippetId) {
    const docRef = doc(db, 'codeSnippets', snippetId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        return docSnap.data();
    } else {
        // Handle the case where the snippet doesn't exist
        console.error('No such document!');
        return null;
    }
}

export async function addComment(snippetId, commentText) {
    const commentRef = collection(db, 'codeSnippets', snippetId, 'comments');
    const data = {
        text: commentText,
        author: auth.currentUser.uid,
        createdAt: new Date(),
    };
    try {
        await addDoc(commentRef, data);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

export async function getCodeComments(codeId) {
    const comments = collection(db, 'comment');
    const q = query(codeRef, where('code_id', '==', codeId));
    const querySnapshot = await getDocs(q);
    const snippets = [];
    querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
    });
    return snippets;
}



export async function getUserCodes(userId) {
    const codeRef = collection(db, 'codes');
    const q = query(codeRef, where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    const snippets = [];
    querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
    });
    return snippets;
}

export async function addLike(snippetId, userId) {
    const likesRef = collection(db, 'codeSnippets', snippetId, 'likes');
    const data = {
        userId: userId,
        likedAt: new Date(),
    };
    try {
        await addDoc(likesRef, data);
    } catch (error) {
        console.error('Error adding like:', error);
    }
}

export async function deleteCodeSnippet(snippetId) {
    const docRef = doc(db, 'codeSnippets', snippetId);
    try {
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export async function addSuggestion(snippetId, suggestionText) {
    const suggestionsRef = collection(db, 'codeSnippets', snippetId, 'suggestions');
    const data = {
        text: suggestionText,
        author: auth.currentUser.uid,
        createdAt: new Date(),
    };
    try {
        await addDoc(suggestionsRef, data);
    } catch (error) {
        console.error('Error adding suggestion:', error);
    }
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


export async function addUserToViewed(snippetId, userId) {
    // Check if the user has already viewed the code snippet
    const viewedRef = collection(db, 'codeSnippets', snippetId, 'viewedUsers');
    const q = query(viewedRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        // User hasn't viewed it yet, add them to the list
        const data = {
            userId: userId,
            viewedAt: new Date(),
        };
        try {
            await addDoc(viewedRef, data);
        } catch (error) {
            console.error('Error adding user to viewed list:', error);
        }
    } else {
        console.log('User has already viewed this code snippet.');
    }
}


export async function filterCodesByLanguage(language) {
    const codeRef = collection(db, 'codeSnippets');
    const q = query(codeRef, where('language', '==', language));
    const querySnapshot = await getDocs(q);
    const snippets = [];
    querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
    });
    return snippets;
}

