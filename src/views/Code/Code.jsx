import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'
import {getUserById} from "@/src/firebase/user.js";
import {Rings} from "react-loader-spinner";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteCode, getCodeCommentsCount, toggleCodeLike} from "@/src/firebase/code.js";

import {TrashIcon} from 'lucide-react'

export default function Code({code, numRows = 1}) {

    const {id } = useParams();
    const navigate = useNavigate();

    const {currentUser, showToast} = useContext(StateContext);
    const [user, setUser] = useState(null)
    const [commentCount, setCommentCount] = useState(0)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const userFetcher = async () => {
            try {
                const user = await getUserById(code.userId);
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingUser(false);
            }
        }
        userFetcher()

        getCodeCommentsCount(code.id).then((count) => {
            setCommentCount(count);
        })
    }, [code]);

    const removeCode = async () => {
       try {
           const deletedCode = await deleteCode(code.id);
           navigate('/codes');
           showToast("Code has been deleted")
       } catch (error) {
           console.log(error);
       }
    }


    return (
        <div key={code.id} className="flex rounded w-full mt-3">
            <div className={"px-2 py-3 relative bg-black text-gray-500 w-full"}>
                {
                    currentUser.uid === code.userId &&
                    <div className={"absolute right-5 top-5"}>
                        <button onClick={removeCode} title={"Delete the code"}
                                className={"bg-red-800 text-white py-2 px-2 w-fit"}>
                            <TrashIcon/>
                        </button>
                    </div>
                }
                <Link to={'/codes/' + code.id}>
                    <div className={"flex items-center h-12 gap-2 cursor-pointer"}>
                        {
                            user &&
                            <>
                                <img className={"rounded-[50%] h-12 float-left"} src={user.photoURL} alt={"User Url"}/>
                                <div className={"flex flex-col font-bold"}>
                                    <div>{user.displayName}</div>
                                </div>
                            </>
                        }
                        {
                            loadingUser && <Rings color="#00BFFF" height={100} width={100}/>
                        }
                    </div>
                    <div>
                        <div className='flex flex-col justify-between'>
                            <h3 className="font-semibold text-center sm:text-md">{code.title}</h3>
                            <p className={"text-white text-opacity-75"}>{code.description}</p>
                        </div>
                    </div>
                </Link>
                <CopyToClipboard text={code.text} onCopy={() => {
                    showToast("Code has been copied to clipboard");
                }}>
                    <button className="text-[13px] bg-gray-800 text-white px-9 py-2 my-2"
                            title='Copy code to clipboard text-center '>
                        Copy to clipboard
                    </button>
                </CopyToClipboard>
                <motion.div className="mt-2 relative">
                    <motion.textarea
                        rows={numRows}
                        initial={{opacity: 1, scale: 1}} transition={{duration: 2}}
                        exit={{opacity: 0, scale: 0}}
                        className={`w-full bg-gray-800 text-white min-h-[200px] relative px-2 py-3 overflow-auto`}
                        defaultValue={code.text} disabled/>
                    <div className={"grid grid-cols-2 gap-x-2 w-full rounded-md"}>
                        <button onClick={toggleCodeLike}
                                className={"py-2 px-2 rounded-md bg-lime-50 text-dark hover:bg-blue-500 opacity-70"}>
                            Like <span className={"font-bold"}>( 20 )</span>
                        </button>
                        {
                        !id &&
                            <Link to={'/codes/' + code.id} className={"py-2 px-2 rounded-md bg-lime-50 text-dark hover:bg-blue-500 opacity-70"}>
                                Comment <span className={"font-bold"}>( {commentCount} )</span>
                            </Link>
                        }
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

Code.propTypes = {
    code: PropTypes.object,
    numRows: PropTypes.number,
}
