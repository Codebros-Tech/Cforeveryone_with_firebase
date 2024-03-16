import {  Navigate, Outlet } from "react-router-dom"
import {auth} from "../../config/firebase.js";

export default function GuestLayout() {
    if (auth.currentUser) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/*    Application Logo*/}
            </div>

            <Outlet />
        </div>
    )
}
