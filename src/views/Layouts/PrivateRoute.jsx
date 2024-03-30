import { Suspense, lazy, useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { StateContext} from "@/src/contexts/ContextProvider.jsx";

const Toast = lazy(() => import('@/src/components/elements/Toast.jsx'));
const Navigation = lazy(() => import('@/src/components/Navcomponents/Navigation.jsx'));

export default function PrivateRoute() {
    const { currentUser } = useContext(StateContext);

    return !currentUser
    ?  <Navigate to={'/login'} /> : (
        <Suspense fallback={<div>Loading ...</div>}>
            <div className='relative'>
                <Navigation />

                <Outlet />

                <Toast />
            </div>
        </Suspense>
    )
}
