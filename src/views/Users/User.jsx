import PropTypes from 'prop-types'
import {lazy, useEffect} from "react";
import {doc, setDoc} from "firebase/firestore";
import {db} from "@/src/config/firebase.js";
const TButton = lazy(() => import('../../components/elements/TButton.jsx'));

export default function User({ user }) {
    return (
        <div className='flex justify-between border-gray-200 border-2 mt-2 py-3 px-2 shadow w-11/12 mx-auto gap-2'>
            <div className={"flex items-center justify-between gap-x-10"}>
                <div className='flex items-center justify-center sm:justify-start rounded-full sm:rounded-none'>
                    <img src={user.photoURL} className="rounded-lg  w-[100px] h-auto" alt="" />
                </div>

                <div>
                    <h5 className='font-semibold uppercase'>{user.displayName}</h5>
                    <div className='flex items-center mt-2 justify-between'>
                        <TButton color='green' to={"/users/"+user.id}>
                            View Profile
                        </TButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

User.propTypes  = {
    user: PropTypes.object.isRequired
}
