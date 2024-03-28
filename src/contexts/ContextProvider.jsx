import {useState, createContext} from "react"
import PropTypes from 'prop-types';

export const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [toast, setToast] = useState({ message: "", show: false});

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    return (
        <StateContext.Provider value={{currentUser, setCurrentUser, toast, setToast, showToast}}>
            {children}
        </StateContext.Provider>
    )
}

ContextProvider.propTypes  = {
    children: PropTypes.node,
}
