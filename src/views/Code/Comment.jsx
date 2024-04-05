import PropTypes from 'prop-types'
import {StateContext} from "../../contexts/ContextProvider.jsx";
import {useContext, useEffect, useState} from "react";
import {getUserById} from "@/src/firebase/user.js";
import {TrashIcon} from "lucide-react";
import {deleteCode, deleteCodeComment} from "@/src/firebase/code.js";

export default function Comment({codeId ,comment}) {
    const { currentUser } = useContext(StateContext);
    const [user, setUser] = useState(null);
    const {showToast} = useContext(StateContext);

    useEffect(() => {
        const fetcher = async () => {
            const user = await getUserById(comment.userId)
            setUser(user);
        }

        fetcher()
    }, [comment]);

    return (
        <div className={`bg-blue-100 ${currentUser.uid === comment.userId ? 'ms-auto bg-blue-400' : 'me-auto' } mb-2 py-3 relative md:py-4 text-[15px] ps-3 w-[90%] border-gray-100 border-1 text-gray-700`}>
            <div className=''>
                <div className='flex pb-2 gap-2 items-center'>
                    <img className="h-[30px] w-auto rounded-full" src={user?.photoURL} alt="" />
                    <span>{user?.displayName}</span>
                </div>
            </div>
            {
                currentUser.uid === comment.userId &&
                <div className={"absolute right-5 top-3"}>
                    <button onClick={() => {
                        deleteCodeComment(codeId, comment.id).then(r => {
                            console.log('comment deleted');
                            showToast("Comment deleted");
                        })
                    }} title={"Delete the code"}
                            className={"bg-red-800 text-white py-2 px-2 w-fit"}>
                        <TrashIcon size={10}/>
                    </button>
                </div>
            }
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
    codeId: PropTypes.string,
    comment: PropTypes.object.isRequired
}
