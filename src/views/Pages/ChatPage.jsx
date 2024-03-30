import {lazy, Suspense} from 'react';

const Sidebar = lazy(() => import('@/src/components/Chat/Sidebar.jsx'));
const ChatSection = lazy(() => import("@/src/components/Chat/ChatSection.jsx"));


export default function ChatPage(){
    return (
        <div className={"bg-[#a7bcff] h-[90vh] overflow-hidden rounded-2xl flex items-center justify-center"}>
            <Suspense fallback={<div>Loading....</div>}>
                <div className={"border-white flex justify-center rounded-xl border-[1px] w-[100%] h-[100%]"}>
                    <Sidebar/>
                    <ChatSection/>
                </div>
            </Suspense>
        </div>
    )
}
