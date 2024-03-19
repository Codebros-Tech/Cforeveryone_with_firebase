import {useState, createContext, useEffect, useContext} from "react"
import PropTypes from 'prop-types';
import {getAuth} from "firebase/auth";

export const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [toast, setToast] = useState({ message: "", show: false});

    useEffect(() => {
        const auth = getAuth();
        const token = localStorage.getItem('firebaseAuthToken');

        const handleUserChange = (user) => {
            setCurrentUser(user);
        };

        auth.onAuthStateChanged(handleUserChange);

        if (token) {
            setCurrentUser(auth.currentUser);
        }

        return () => {
            auth.onAuthStateChanged(handleUserChange)
        };
    }, []);
    

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    return (
        <StateContext.Provider value={{currentUser, toast, setToast, showToast}}>
            {children}
        </StateContext.Provider>
    )
}

ContextProvider.propTypes  = {
    children: PropTypes.node,
}
