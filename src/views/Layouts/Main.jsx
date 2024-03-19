import {lazy } from 'react'
import { Outlet} from 'react-router-dom'
const MainHeader = lazy(() => import("../../components/MainHeader.jsx"));

export default function Hero() {
    return (
        <div className="bg-white">
            <MainHeader />

            <Outlet />
        </div>
    )
}
