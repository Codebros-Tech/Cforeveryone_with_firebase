import { auth } from '../config/firebase.js';
import { collection, getDocs, addDoc, query, doc, where, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';


export async function postCode(code, title, description, language = 'C') {
    const codeRef = collection(db, 'codes');
    const data = {
        text: code,
        title: title,
        description: description,
        language: language,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
    };
    try {
        const docRef = await addDoc(codeRef, data);
        console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export async function getCodeById(codeId) {
    const docRef = doc(db, 'codes', codeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        return docSnap.data();
    } else {
        // Handle the case where the snippet doesn't exist
        console.error('No such document!');
        return null;
    }
}

export async function deleteCode(codeId) {
    const docRef = doc(db, 'codes', codeId);
    try {
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export async function addCodeComment(codeId, commentText) {
    const commentRef = collection(db, 'codes', codeId, 'comments');
    const data = {
        text: commentText,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
    };
    try {
        await addDoc(commentRef, data);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

export async function getCodeComments(codeId) {
   try {
       const comments = collection(db, 'codes', codeId, 'comments');
       const q = query(comments);
       const querySnapshot = await getDocs(q);
       const snippets = [];
       querySnapshot.forEach((doc) => {
           snippets.push({ ...doc.data(), id: doc.id });
       });
       return snippets;
   } catch (error ) {
       console.error("Error occurred when fetching the code comments");
   }
}

export async  function getUserCodes(currentUser) {
    let userId = currentUser.uid;
    const snippets = [];
    if (userId) {
        const codeRef  = collection(db, 'codes');
        const q = query(codeRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            snippets.push({...doc.data(), id: doc.id});
        });
    }
    return snippets;
}

export async function addCodeLike(codeId, userId) {
    const likesRef = collection(db, 'codes', codeId, 'likes');
    const likeQuery = query(
        likesRef,
        where('userId', '==', userId),
        where('codeId', '==', codeId),
    );
    const likeQuerySnapshot = await getDoc(likeQuery);

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

export async function addSuggestion(snippetId, suggestionText) {
    const suggestionsRef = collection(db, 'codes', snippetId, 'suggestions');
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

export async function getAllCodeLikesCount(codeId) {
    const likesRef = collection(db, 'codes', codeId, 'likes');
    const q = query(likesRef);
    const querySnapshot = await getDocs(q);
    const likes = [];
    querySnapshot.forEach((doc) => {
        likes.push(doc.data());
    });
    return likes.length;
}

export async function addUserToCodeViewers(codeId, userId) {
    // Check if the user has already viewed the code snippet
    const viewedRef = collection(db, 'codes', codeId, 'views');
    const q = query(viewedRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
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
    const codeRef = collection(db, 'codes');
    const q = query(codeRef, where('language', '==', language));
    const querySnapshot = await getDocs(q);
    const snippets = [];
    querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
    });
    return snippets;
}

