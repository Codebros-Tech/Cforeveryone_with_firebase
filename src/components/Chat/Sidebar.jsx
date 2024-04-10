import {lazy, Suspense} from "react";
const Chats = lazy(() => import("@/src/components/Chat/Chats.jsx"));
const ChatNavbar = lazy(() => import("@/src/components/Chat/ChatNavbar.jsx"));
const Search = lazy(() => import("@/src/components/Chat/Search.jsx"));
const Loading = lazy(() => import("@/src/components/elements/Loading.jsx"))

export default function Sidebar() {
    return (
        <div className={"bg-gray-800 text-white h-full flex-[1]"}>
            <Suspense fallback={<Loading />}>
                <ChatNavbar />
                <Search />
                <Chats />
            </Suspense>
        </div>
    )
}