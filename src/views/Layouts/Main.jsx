import {lazy, Suspense} from 'react'
import { Outlet} from 'react-router-dom'

import Loading from "@/src/components/elements/Loading.jsx";

const MainHeader = lazy(() => import("../../components/Header/MainHeader.jsx"));

export default function Main() {
    return (
        <div className="bg-white">
            <Suspense fallback={<Loading />}>
                <MainHeader />

                <Outlet />
            </Suspense>
        </div>
    )
}
