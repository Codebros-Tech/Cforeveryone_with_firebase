import {lazy} from "react";

const UserProfileDetail = lazy(() => import("./UserProfileDetail.jsx"));

export default function Search() {
    return (
        <div>
            <div className={"p-3"}>
                <input placeholder={"Find A User."} type="text" className={"bg-transparent border-none text-white w-full px-3 py-2"}  />
            </div>
            <UserProfileDetail />
        </div>
    )
}