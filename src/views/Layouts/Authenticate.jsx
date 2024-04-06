import PropTypes from "prop-types";
import {useContext} from "react";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function Authenticate() {

    const {currentUser} = useContext(StateContext);

    return !currentUser
        ? <Navigate to={'/login'} />
        : (
        <>
            <Outlet />
        </>
    )
}

Authenticate.propTypes = {
    children: PropTypes.node
}