import {logoutUser} from "@/src/firebase/user.js";
import {useContext} from "react";
import {StateContext} from "@/src/contexts/UserProvider.jsx";

export default function ChatNavbar() {

    const {currentUser} = useContext(StateContext);

    return (
        <div className={"flex items-center  justify-between bg-gray-800 h-[50px] px-[10px]"}>
            <span className={"font-bold "}>Chat</span>
            <div className={"flex gap-5 items-center text-[#ddddf7]"}>
                <img alt={"Logo"} className={"bg-[#ddddf7] h-[24px] w-[24px] rounded-[50%] object-cover"} src={"d"} />
                <span className={""}>{currentUser.displayName}</span>
                <button onClick={() => logoutUser()} className={"bg-[#5d5b8d] cursor-pointer text-[#ddddf7] text-[10px] px-2 py-2"}>Logout</button>
            </div>
        </div>
    )
}