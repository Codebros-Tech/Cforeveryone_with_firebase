import {lazy, Suspense} from "react";

const Message = lazy(() => import("@/src/components/Chat/Message.jsx"));

export default function Messages() {
    return (
        <Suspense fallback={<div>Loading the messages</div>}>
            <div>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
            </div>
        </Suspense>
    )
}