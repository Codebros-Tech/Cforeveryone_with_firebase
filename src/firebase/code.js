import {auth, db, storage} from '../config/firebase.js';
import {addDoc, collection, doc, deleteDoc, getDoc, getDocs, query, serverTimestamp, updateDoc, where} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {generateKey, randomUUID} from "node:crypto";

export async function postCode(code, title, description, imageFile = null,  language = 'C') {


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


        const unique = randomUUID();
        const storageRef = ref(storage,  'codes/'+unique);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        if (imageFile) {
            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateDoc(
                            doc(db,'codes', docRef.id),
                            { image: downloadURL }
                        );
                    });
                }
            )
        }

    } catch (error) {
        console.error('Error adding document:', error);
    }
}

export async function getCodeById(codeId) {
    const docRef = doc(db, 'codes', codeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
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

export async function addCodeComment(user, codeId, commentText) {
    const commentRef = collection(db, 'codes', codeId, 'comments');
    const data = {
        text: commentText,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
    };
    try {
        return await addDoc(commentRef, data);
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

export async function deleteCodeComment(codeId, commentId) {
    try {
        const commentDoc = doc(db, 'codes', codeId, 'comments', commentId);
        return await deleteDoc(commentDoc);
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

export async function getCodeComments(codeId) {
    try {
        const commentCollection = collection(db, 'codes', codeId, 'comments')
        const q = query(commentCollection);
        const commentSnapshot = await getDocs(q);
        return commentSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        console.log(error);
    }
}

export async function getCodeCommentsCount(codeId) {
    try {
        if (codeId) {
            const commentCollection = collection(db, 'codes', codeId, 'comments')
            const q = query(commentCollection);
            const commentSnapshot = await getDocs(q);
            return commentSnapshot.size;
        }
    } catch (error) {
        console.log(error);
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

export async function toggleCodeLike(codeId, userId) {
    const likesRef = collection(db, 'codes', codeId, 'likes');
    const likeQuery = query(
        likesRef,
        where('userId', '==', userId),
    );
    const likeQuerySnapshot = await getDocs(likeQuery);

    if (likeQuerySnapshot.size > 0) {
        // delete the like the user put if it already exist.
        likeQuerySnapshot.docs.map(async (item) => {
            await deleteDoc(doc(db, 'codes', codeId, 'likes', item.id));
        })
    } else {
        // what happens if it does not yet exist
        const data = {
            userId: userId,
            likedAt: serverTimestamp(),
        };

        try {
            await addDoc(likesRef, data);
        } catch (error) {
            console.error('Error adding like:', error);
        }
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

export async function getCodeLikesCount(codeId, userId) {
    try {
       if (codeId) {
           const likesRef = collection(db, 'codes', codeId, 'likes');
           const q = query(likesRef);
           const querySnapshot = await getDocs(q);

           const userLikeRef = collection(db, 'codes', codeId, 'likes');
           const userLikeQuery = query(
               userLikeRef,
               where('userId', '==', userId),
           );
           const likeQuerySnapshot = await getDocs(userLikeQuery);

           if (likeQuerySnapshot.size > 0) {
               return {size: querySnapshot.size, userChecked: true};
           } else {
               return {size: querySnapshot.size, userChecked: false};
           }
       }
    } catch (error) {
        console.error("Failure in fetching the number of comments");
    }
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

