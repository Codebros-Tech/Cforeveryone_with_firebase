import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'
import {getUserById} from "@/src/firebase/user.js";
import {TailSpin,Rings} from "react-loader-spinner";

export default function Code({code}) {

    const {showToast} = useContext(StateContext);
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getUserById(code.userId);
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingUser(false);
            }
        }

        getUser()
    }, []);

    return (
        <div key={code.uid} className="flex rounded w-full mt-3">
            <div className={"px-2 py-3 bg-black text-gray-500 w-full"}>
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
                        loadingUser && <Rings color="#00BFFF" height={100} width={100} />
                    }
                </div>

                <div>
                    <div className='flex flex-col justify-between'>
                        <h3 className="font-semibold text-center sm:text-md">{code.title}</h3>
                        <p className={"text-white text-opacity-75"}>{code.description}</p>
                    </div>
                </div>
                <CopyToClipboard text={code.text} onCopy={() => {
                    showToast("Code has been copied to clipboard");
                }}>
                    <button className="text-[13px] bg-gray-800 text-white px-9 py-2 my-2" title='Copy code to clipboard text-center '>
                        Copy to clipboard
                    </button>
                </CopyToClipboard>
                <motion.div
                    className="mt-2"
                >
                    <motion.textarea initial={{ opacity: 1, scale: 1}} transition={{ duration: 2}} exit={{ opacity: 0, scale: 0}} className="w-full bg-gray-800 text-white min-h-[200px] relative px-2 py-3 overflow-auto" defaultValue={code.text} disabled />
                </motion.div>
            </div>
        </div>
    )
}

Code.propTypes = {
    code: PropTypes.object,
    commentHide: PropTypes.bool,
}
