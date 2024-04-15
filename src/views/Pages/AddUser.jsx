import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {auth} from '../../config/firebase.js'
import {storeUserInformation} from "@/src/firebase/user.js";
import {getAuth} from "firebase/auth";

export default function AddUser() {
    const {id} = useParams();

    useEffect(() => {

        getAuth().getUser(id).then(async (user) => {
            if (!user.exists()) {
                console.log("added user ", user.displayName);
                await storeUserInformation(user);
            } else {
                console.log("already there");
            }
        })

    }, [id]);
    return (
        <div>
            {id} something
        </div>
    )
}