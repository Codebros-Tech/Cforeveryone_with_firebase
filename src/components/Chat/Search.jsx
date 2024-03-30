import {lazy, Suspense} from "react";

const UserProfileDetail = lazy(() => import("./UserProfileDetail.jsx"));

export default function Search() {
    return (
        <Suspense fallback={<div>Loading Search....</div>}>
            <div>
                <div className={"p-3"}>
                    <input placeholder={"Find A User."} type="text"
                           className={"bg-transparent border-none text-white w-full px-3 py-2"}/>
                </div>
                <UserProfileDetail/>
            </div>
        </Suspense>
    )
}