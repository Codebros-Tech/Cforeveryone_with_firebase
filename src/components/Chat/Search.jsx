import {Suspense, useContext, useRef, useState} from "react"
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore"
import {db} from "@/src/config/firebase.js"
import {StateContext} from "@/src/contexts/UserProvider.jsx";

export default function Search() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)
    const searchRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false);

    const { currentUser } = useContext(StateContext);

    const usersRef = collection(db, 'users');


    const handleSearch = async () => {
        const searchText = searchRef.current.value.toLowerCase();
        setNotFound(false);

        setUser(null);
        const q = query(
            usersRef,
            where("displayName", "==", searchText)
        )

        try {
            setLoading(true);
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                console.log("item is ", doc.data());
                setUser({uid: doc.id,  ...doc.data()})
            })

            if (querySnapshot.size === 0 ) {
                setNotFound(true);
            } else {
                setNotFound(false);
            }
        } catch (error) {
            setError(true);
            console.log("An error occurred ", error);
        }
        setLoading(false);
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        const chatRef = doc(db, "chats", combinedId)
        const userChatsCurrentRef = doc(db, "userChats", currentUser.uid);
        const userChatsUserRef = doc(db, "userChats", user.uid);

        try {
            const res = await getDoc(chatRef);

            // this users have never chatted with each other (they have no chat history.
            if (!res.exists()) {
                console.log('no chat existed')
                // doing all of these if these 2 users don't have any chat history
                // we are going to do these actions if there was no chat between that user and the current user.

                // we are going to add a chat doc which is going to contain an array of messages
                await setDoc(chatRef, { messages: []})

                // We are going to add the link the other user in the current user information
                await updateDoc(userChatsCurrentRef, {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp(),
                })


                // then we are going to link the current user in the other user chat information
                await updateDoc(userChatsUserRef, {
                    // update the chat history of both users when one clicks on the other.
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId+".date"]: serverTimestamp(),
                })
            }

            searchRef.current.value = "";
            setUser(null)

        } catch (error) {
            console.error("error occurred" , error);
        }
    }

    
    return (
        <Suspense fallback={<div>Loading Search....</div>}>
            {
                error && <div className={"bg-red-800 text-white py-3 px-3"}>Something went wrong</div>
            }
            <div className={"border-b-[1px] border-b-white"}>
                <div className={"p-3"}>

                    <input ref={searchRef}
                           onChange={() => handleSearch()}
                           placeholder={"Find A User."} type="text"
                           className={"bg-transparent border-none text-white w-full px-3 py-2"}
                    />

                    {
                        notFound && searchRef.current.value &&
                        <div className={"pt-3"}>
                            No name with {searchRef.current.value}
                        </div>
                    }

                    {
                        loading &&
                        <div className={"pt-3"}>
                            Loading ....
                        </div>
                    }

                </div>
                {
                    user &&
                    <div onClick={() => handleSelect()}
                         className={"flex p-3 gap-3 text-white hover:bg-[#2f2d52] cursor-pointer items-center"}>
                        <img className={"w-[50px] h-[50px] rounded-[50%]"}
                             src={user?.photoURL}
                             alt={"User Image"}/>
                        <div>
                            <span className={"text-lg font-medium"}>{user?.displayName}</span>
                            <p className={"text-sm text-[lightGray]"}>Hello</p>
                        </div>
                    </div>
                }
            </div>
        </Suspense>
    )
}