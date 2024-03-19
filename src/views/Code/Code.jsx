import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import Modal from '../../components/Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'
import {addCodeLike, getAllCodeLikesCount} from "../../firebase/code.js";
import {auth} from "../../config/firebase.js";

export default function Code({thecode, commentHide = false}) {

    const {showToast} = useContext(StateContext);
    const [logState, setLogState ] = useState(false);
    const [code, setCode] = useState(thecode);

    const [ modalState, setModalState] = useState(false);

    const modalTitle  = "Delete The Code";
    const modalText = "Are you sure you want to delete this Code? All of the comments related to this code will be deleted."

    const addLike = (code_id) => {
        addCodeLike(code_id, auth.currentUser.uid).then(r => console.log("Code has been liked"));
    }

    const deleteCode = (code_id) => {
        const deleteCode = deleteCode(code_id);
        console.log('delete code response', deleteCode);
    }


    if (modalState) {
        return <Modal yesFunction={() => deleteCode(code.id)} text={modalText} title={modalTitle} />
    }

    const codeLikesCount = getAllCodeLikesCount(code.id);

    return (
        <div className="flex rounded w-full mt-3">
            {
                code  &&
                <div className={"px-2 bg-black text-gray-500 w-full md:w-11/12"}>
                    <div>
                        {/*<div className={"flex justify-between"}>*/}
                        {/*    <span>{code.user.name}</span>*/}
                        {/*    <span*/}
                        {/*        className={"font-thin text-[14px] hover:text-[17px] delay-500"}>{code.createdAt}</span>*/}
                        {/*    {*/}
                        {/*        code.user.profile !== 'http://localhost:8000' &&*/}
                        {/*        <img className="h-[30px] w-auto rounded-full" src={code.user.profile} alt=""/>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className='flex flex-col justify-between'>
                            <h3 className="font-semibold sm:text-lg">{code.title}</h3>
                            <p>{code.description}</p>
                            <div className='ms-auto'>
                                {
                                    // code.user.email === currentUser.email &&
                                    <div className='flex gap-x-4'>
                                        <button title={"Click to toggle between the code and the output"} onClick={() => setLogState((prev) => !prev)}>
                                            {!logState ? "Output" : "Code"}
                                        </button>
                                        <a href={`/codes/${code.id}`}>Edit</a>
                                        <button className={"text-red-700 hover:text-red-900"} onClick={() => setModalState(true)}>
                                            Delete
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <CopyToClipboard text={code.text} onCopy={() => {
                        showToast("Code has been copied to clipboard");
                    }}>
                        <button className="text-[13px] bg-gray-800 text-white" title='Copy code to clipboard text-center '>
                            Copy
                        </button>
                    </CopyToClipboard>
                    <motion.div
                        className="mt-2"
                    >
                        {
                            !logState &&
                            <motion.textarea initial={{ opacity: 1, scale: 1}} transition={{ duration: 2}} exit={{ opacity: 0, scale: 0}} className="w-full bg-gray-800 text-white min-h-[200px] relative overflow-auto" defaultValue={code.text} disabled />
                        }
                        {
                            logState && code.errorImage !== 'http://localhost:8000' &&
                            <motion.img initial={{ scale: 0}} animate={{scale: 1}} transition={{ duration: 1}} className='w-80' alt={"The code error image."} src={code.errorImage}/>
                        }
                    </motion.div>
                    {!commentHide &&
                        <div className={"flex pt-2 font-thin gap-x-2 text-gray-100 "}>
                            <button onClick={() => addLike(code.id)} className={" px-4 bg-gray-800"}>
                                 Like <span className={"text-[14px] "}>{codeLikesCount}</span>
                            </button>
                            <a href={`/codes/${code.id}`} className='flex'>
                                Comment
                            </a>
                            <a href='/codes/id/suggestion'>
                                Suggest
                            </a>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

Code.propTypes = {
    thecode: PropTypes.object,
    commentHide: PropTypes.bool,
}
