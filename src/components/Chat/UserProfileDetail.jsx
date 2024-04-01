import PropTypes from "prop-types";
import {useContext} from "react";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";
import {getDocs, setDoc} from "firebase/firestore";
import {db} from "@/src/config/firebase.js";

export default function UserProfileDetail({user}) {
    const { currentUser } = useContext(StateContext);
    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

        try {
            const res = await getDocs(db, "chats", combinedId);

            if (!res.exists()) {
                // if it doesn't exist, create an empty array for the object property called messages.
                await setDoc(doc, (db, "chats", combinedId), {
                    messages: [

                    ]
                })
            }
        } catch (error) {
            //
        }
    }

    return (
        <div onClick={() => handleSelect()} className={"flex p-3 gap-3 text-white hover:bg-[#2f2d52] cursor-pointer items-center"}>
            <img className={"w-[50px] h-[50px] rounded-[50%]"}
                 src={user?.photoURL}
                 alt={"User Image"}/>
            <div>
                <span className={"text-lg font-medium"}>{user?.displayName}</span>
                <p className={"text-sm text-[lightGray]"}>Hello</p>
            </div>
        </div>
    )
}

UserProfileDetail.propTypes = {
    user: PropTypes.object,
}