import { Suspense, lazy, useContext} from 'react'
import {Outlet} from 'react-router-dom'
const Footer =  lazy(() => import( "@/src/components/Footer.jsx"));

const Toast = lazy(() => import('@/src/components/elements/Toast.jsx'));
const Navigation = lazy(() => import('@/src/components/Navcomponents/Navigation.jsx'));

export default function PrivateRoute() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <div className='relative min-h-screen flex flex-col justify-between'>
                <div>
                    <Navigation />

                    <Outlet />

                    <Toast />
                </div>
                <Footer />
            </div>
        </Suspense>
    )
}
