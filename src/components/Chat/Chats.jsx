import { useContext, useEffect, useState} from "react";
import {StateContext} from "@/src/contexts/UserProvider.jsx";
import {doc, onSnapshot} from 'firebase/firestore'
import {db} from "@/src/config/firebase.js";
import {ChatContext} from "@/src/contexts/ChatProvider.jsx";

export default function Chats() {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(StateContext)
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            })

            return () => {
                unsubscribe();
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type: "CHANGE_USER", payload: u});
    }

    return (
        <div>
            <div>
                {
                    chats &&
                    Object.entries(chats).map((chat) => (
                        <div key={chat[0]} onClick={() => {handleSelect(chat[1].userInfo)}}
                             className={"flex p-3 gap-3 text-white hover:bg-[#2f2d52] cursor-pointer items-center"}>
                            <img className={"w-[50px] h-[50px] rounded-[50%]"}
                                 src={chat[1].userInfo?.photoURL}
                                 alt={"User Image"}/>
                            <div>
                                <span className={"text-lg font-medium"}>{chat[1].userInfo.displayName}</span>
                                <p className={"text-sm text-[lightGray]"}>{chat[1].userInfo.lastMessage?.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}