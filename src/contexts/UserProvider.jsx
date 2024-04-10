import {useState, createContext, useEffect} from "react"
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';

export const StateContext = createContext({});

export const UserProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState({});
    const [toast, setToast] = useState({ message: "", show: false});

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <StateContext.Provider value={{currentUser, toast, setToast, showToast}}>
            {children}
        </StateContext.Provider>
    )
}

UserProvider.propTypes  = {
    children: PropTypes.node,
}
