import {lazy } from 'react'
import { Outlet} from 'react-router-dom'

const MainHeader = lazy(() => import("../../components/Header/MainHeader.jsx"));

export default function Main() {
    return (
        <div className="bg-white">
            <MainHeader />

            <Outlet />
        </div>
    )
}
