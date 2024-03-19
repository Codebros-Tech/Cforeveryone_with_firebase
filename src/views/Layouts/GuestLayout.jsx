import { Outlet, useNavigate} from "react-router-dom"
import {StateContext} from "../../contexts/ContextProvider.jsx";
import {useContext, useEffect} from "react";

export default function GuestLayout() {
    const { currentUser } = useContext(StateContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/*    Application Logo*/}
            </div>

            <Outlet />
        </div>
    )
}
