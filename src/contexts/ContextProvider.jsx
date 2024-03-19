import {useState, createContext, useEffect} from "react"
import PropTypes from 'prop-types';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebase.js";

export const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    toast: {},
    setToast: () => {},
    showToast: () => {},
});

export const ContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [allCodes, setAllCodes] = useState([]);

    const [toast, setToast] = useState({ message: "", show: false});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth ,(user) => {
            if (user) {
                console.log(user);
                setCurrentUser(user);
            }
        })

        return () => unsubscribe();
    }, [])

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
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
