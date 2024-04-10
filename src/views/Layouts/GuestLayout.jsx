import {Navigate, Outlet} from "react-router-dom"
import { useContext} from "react";
import {StateContext} from "@/src/contexts/UserProvider.jsx";


export default function GuestLayout() {
    const { currentUser } = useContext(StateContext);

    return currentUser
        ? <Navigate to={'/dashboard'} />
        : <div className="flex dark:bg-black dark:text-white  min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Outlet />
            </div>
        </div>
}
