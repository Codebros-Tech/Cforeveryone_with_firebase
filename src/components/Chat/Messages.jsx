import {lazy} from "react";

const Message = lazy(() => import("@/src/components/Chat/Messages.jsx"));

export default function Messages() {
    return (
        <div>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}