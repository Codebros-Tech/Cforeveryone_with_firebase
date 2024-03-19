import {Navigate, Outlet, useNavigate} from "react-router-dom"
import {checkLoginStatus} from "../../firebase/user.js";
import {useEffect} from "react";
import {isLogicalOrOperator} from "eslint-plugin-react-refresh";

export default function GuestLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = checkLoginStatus();
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, []);


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/*    Application Logo*/}
            </div>

            <Outlet />
        </div>
    )
}
