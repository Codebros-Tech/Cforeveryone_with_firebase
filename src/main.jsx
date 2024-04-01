import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
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
import WelcomePage from "./views/Pages/WelcomePage.jsx"
import NotFound from './views/Pages/NotFound.jsx'
import UserInfo from "./views/Users/UserInfo"
import InfoUpdate from "./views/Users/InfoUpdate"
import AccountInfo from "./views/Users/AccountInfo"
import Main from './views/Layouts/Main'
import CodeCreate from "./views/Code/CodeCreate"
import CodeIndex from "./views/Code/CodeIndex"
import MyCodes from "./views/Code/MyCodes"
import CodeView from './views/Code/CodeView.jsx';
import Contact from "./views/Pages/Contact"
import ChatPage from "@/src/views/Pages/ChatPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Main />}>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/team" element={<Team />} />
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

                <Route path="/chats" element={<ChatPage />} />

                <Route path="/*" element={<NotFound />} />
            </Route>

            <Route path="/" element={<GuestLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Route>
    )
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router} fallbackElement={<div>Loading the component</div>} />
    </ContextProvider>
)
