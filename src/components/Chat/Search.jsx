import {lazy, Suspense, useState} from "react"
import {collection, getDocs, query, where} from "firebase/firestore"
import {db} from "@/src/config/firebase.js"

const UserProfileDetail = lazy(() => import("./UserProfileDetail.jsx"))

export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)

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

                    <input onChange={(ev) => setUsername(ev.target.value)}
                            onKeyDown={handleKey}  placeholder={"Find A User."} type="text"
                           className={"bg-transparent border-none text-white w-full px-3 py-2"}
                    />

                </div>
                {user && <UserProfileDetail user={user}/> }
            </div>
        </Suspense>
    )
}