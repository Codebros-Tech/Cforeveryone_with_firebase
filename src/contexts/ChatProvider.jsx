import {createContext, useContext, useReducer} from "react"
import PropTypes from 'prop-types';
import {StateContext} from "@/src/contexts/UserProvider.jsx";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {

    const {currentUser} = useContext(StateContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    }

    // a reducer is a function that takes in a state and an action and the action is going to determine
    // some task that will performed to manipulate the state of that variable.
    // action is an object that is going to contain a property called type.
    // the  reducer function is going to return the new state of the variable
    // reduce contains a payload, which can be thought of as the data which we are working on .
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            default:
                return state;
        }
    }

    // useReducer takes two parameter, first for the reducer function and then the initial state and returns the state and dispatch function
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

ChatProvider.propTypes  = {
    children: PropTypes.node,
}
