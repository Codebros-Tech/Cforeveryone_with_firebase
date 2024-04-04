import PropTypes from 'prop-types'
import {StateContext} from "../../contexts/ContextProvider.jsx";
import {useContext, useEffect, useState} from "react";
import {getUserById} from "@/src/firebase/user.js";

export default function Comment({comment}) {
    const { currentUser } = useContext(StateContext);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetcher = async () => {
            const user = await getUserById(comment.userId)
            setUser(user);
        }

        fetcher()
    }, [comment]);

    return (
        <div className={`bg-blue-100 ${currentUser.uid === comment.userId ? 'ms-auto bg-blue-400' : 'me-auto' } mb-2 py-3 md:py-4 text-[15px] ps-3 w-[90%] border-gray-100 border-1 text-gray-700`}>
            <div className=''>
                <div className='flex pb-2 gap-2 items-center'>
                    <img className="h-[30px] w-auto rounded-full" src={user?.photoURL} alt="" />
                    <span>{user?.displayName}</span>
                </div>
            </div>
            <hr />
            <div className='mt-1'>
                <pre className={"whitespace-pre-wrap"}>
                    {comment.text}
                </pre>
            </div>
            <div className='text-right text-[12px] flex items-center px-2 justify-end'>
                {comment.createdAt.seconds}
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
