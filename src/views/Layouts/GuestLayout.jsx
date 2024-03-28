import {Navigate, Outlet} from "react-router-dom"
import {checkLoginStatus} from "../../firebase/user.js";


export default function GuestLayout() {
    const isLoggedIn = checkLoginStatus();
    return isLoggedIn
        ? <Navigate to={'/dashboard'} />
        : <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Outlet />
            </div>
        </div>
}
