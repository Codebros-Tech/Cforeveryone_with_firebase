import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider.jsx'

import {Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Dashboard from "./views/Users/Dashboard"
import Login from './views/Guest/Login'
import GuestLayout from "./views/Layouts/GuestLayout"
import PrivateRoute from "./views/Layouts/PrivateRoute.jsx"
import Signup from "./views/Guest/Signup"
import Users from "./views/Users/Users"
import Team from "./views/Pages/Team"
import Hero from "./components/Hero"
import About from "./views/Pages/About"
import NotFound from './components/NotFound'
import UserInfo from "./views/Users/UserInfo"
import InfoUpdate from "./views/Users/InfoUpdate"
import AccountInfo from "./views/Users/AccountInfo"
import Features from "./views/Guest/Features"
import AdminLogin from "./views/Guest/AdminLogin"
import Main from './views/Layouts/Main'
import AdminLayout from "./views/Layouts/AdminLayout"
import CodeCreate from "./views/Code/CodeCreate"
import CodeIndex from "./views/Code/CodeIndex"
import MyCodes from "./views/Code/MyCodes"
import CodeView from './views/Code/CodeView.jsx';
import Contact from "./views/Pages/Contact"
// const CodeView = lazy(()  => import('./views/Code/CodeView.jsx'));
// const Contact = lazy(() => import("./views/Pages/Contact"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Main />}>
                <Route path="/" element={<Hero />} />

                <Route path="/team" element={<Team />} />
                <Route path="/features" element={<Features />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
            </Route>

            <Route path="/" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/codes" element={<CodeIndex />} />
                <Route path="/codes/mine" element={<MyCodes />} />
                <Route path="/codes/create" element={<CodeCreate />} />
                <Route path="/codes/:id/edit" element={<CodeCreate />} />
                <Route path="/codes/:id" element={<CodeView />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/:username" element={<AccountInfo />} />

                <Route path="/myinfo" element={<UserInfo />} />
                <Route path="/myinfo/edit" element={<InfoUpdate />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
            </Route>
        </Route>
    )
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router} fallbackElement={<div>Loading the component</div>} />
    </ContextProvider>
)
