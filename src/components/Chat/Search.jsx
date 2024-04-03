import {Suspense, useContext, useState} from "react"
import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore"
import {db} from "@/src/config/firebase.js"
import {StateContext} from "@/src/contexts/ContextProvider.jsx";

export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)

    const { currentUser } = useContext(StateContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', username)
        )

        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
            setError(true);
        }
    }

    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: []})
            }

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId+".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedId+".date"]: serverTimestamp()
            })

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId+".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [combinedId+".date"]: serverTimestamp()
            })

            setUsername("")
            setUser(null)

        } catch (error) {
            //
        }
    }

    const handleKey = (event) => {
        event.code === "Enter" && handleSearch()
    }
    
    return (
        <Suspense fallback={<div>Loading Search....</div>}>
            {
                error && <div className={"bg-red-800 text-white py-3 px-3"}>Something went wrong</div>
            }
            <div className={"border-b-[1px] border-b-white"}>
                <div className={"p-3"}>

                    <input value={username}
                           onChange={(ev) => setUsername(ev.target.value)}
                           onKeyDown={handleKey} placeholder={"Find A User."} type="text"
                           className={"bg-transparent border-none text-white w-full px-3 py-2"}
                    />

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