import { lazy } from 'react';

const Sidebar = lazy(() => import('@/src/components/Sidebar.jsx'));
const Chats = lazy(() => import("@/src/components/Chats.jsx"));

export default function ChatPage(){
    return (
        <div className={"bg-[#a7bcff] h-[90vh] overflow-hidden rounded-2xl flex items-center justify-center"}>
            <div className={"border-white flex justify-center rounded-xl border-[1px] w-[100%] h-[100%]"}>
                <Sidebar />
                <Chats />
            </div>
        </div>
    )
}
