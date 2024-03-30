import {lazy} from "react";
const Chats = lazy(() => import("@/src/components/Chat/Chats.jsx"));
const ChatNavbar = lazy(() => import("@/src/components/Chat/ChatNavbar.jsx"));
const Search = lazy(() => import("@/src/components/Chat/Search.jsx"));

export default function Sidebar() {
    return (
        <div className={"bg-[#3e3c61] text-white h-full flex-[1]"}>
            <ChatNavbar />
            <Search />
            <Chats />
        </div>
    )
}