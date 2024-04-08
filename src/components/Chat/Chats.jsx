import { useContext, useEffect, useState} from "react";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";
import {doc, onSnapshot} from 'firebase/firestore'
import {db} from "@/src/config/firebase.js";

export default function Chats() {
    const [chats, setChats] = useState([])
    const { currentUser } = useContext(StateContext)

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

    return (
        <div>
            <div>
                {
                    chats &&
                    Object.entries(chats).map((chat) => (
                        <div key={chat[0]}
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