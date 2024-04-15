import { useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Loading from "@/src/components/elements/Loading.jsx";
import {getUserById} from "@/src/firebase/user.js";

export default function UserInfo() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const {id} = useParams();

    useEffect(() => {

        const fetcher = async () => {
            setLoading(true)
            const gottenUser = await getUserById(id);
            setUser(gottenUser);
            setLoading(false);
        }

        id && fetcher()
    }, [id]);


    return loading ? <Loading /> : user && (
        <div className='w-11/12 mx-auto'>

            <div className="px-4 my-10 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{user.displayName.toUpperCase()} Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <img src={user.photoURL} className='rounded-full' alt="" />
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.displayName.toUpperCase()}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}