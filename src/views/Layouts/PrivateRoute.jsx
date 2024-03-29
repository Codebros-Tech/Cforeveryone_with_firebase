import { Suspense, lazy, useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { StateContext} from "@/src/contexts/ContextProvider.jsx";

const Toast = lazy(() => import('@/src/components/Toast'));
const Navigation = lazy(() => import('@/src/components/Navcomponents/Navigation.jsx'));

export default function PrivateRoute() {
    const { currentUser } = useContext(StateContext);

    return !currentUser
    ?  <Navigate to={'/login'} /> : (
        <>
            <div className='relative'>
                <Navigation />

                <Suspense fallback={<div>Loading ....</div>}>
                    <Outlet />
                </Suspense>

                <Toast />
            </div>
        </>
    )
}
