import {useState, createContext} from "react"
import PropTypes from 'prop-types';

export const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    toast: {},
    setToast: () => {},
    showToast: () => {},
});

export const ContextProvider = ({ children }) => {

    const [allCodes, setAllCodes] = useState([]);

    const [toast, setToast] = useState({ message: "", show: false});

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    return (
        <StateContext.Provider value={{
            toast,
            showToast,
            allCodes,
            setAllCodes,
        }}>

            {children}

        </StateContext.Provider>
    )
}

ContextProvider.propTypes  = {
    children: PropTypes.node,
}
