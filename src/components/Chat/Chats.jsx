import {lazy} from "react";

const UserProfileDetail = lazy(() => import("./UserProfileDetail.jsx"));
export default function Chats() {
    return (
        <div>
            <UserProfileDetail />
            <UserProfileDetail />
            <UserProfileDetail />
            <UserProfileDetail />
        </div>
    )
}