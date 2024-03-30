import {lazy, Suspense} from "react";

const Message = lazy(() => import("@/src/components/Chat/Message.jsx"));

export default function Messages() {
    return (
        <Suspense fallback={<div>Loading the messages</div>}>
            <div className={'bg-[#ddddf7] p-5 messages-container'}>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </div>
        </Suspense>
    )
}