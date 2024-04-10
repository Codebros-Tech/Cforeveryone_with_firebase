import {useState, createContext, useEffect, useContext} from "react"
import PropTypes from 'prop-types';
import {StateContext} from "@/src/contexts/UserProvider.jsx";

export const ChatContext = createContext({});

export const UserProvider = ({ children }) => {

    const {currentUser} = useContext(StateContext);

    return (
        <ChatContext.Provider value={}>
            {children}
        </ChatContext.Provider>
    )
}

UserProvider.propTypes  = {
    children: PropTypes.node,
}
