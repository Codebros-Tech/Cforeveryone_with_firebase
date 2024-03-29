import PropTypes from 'prop-types';
import {lazy, useContext, useState} from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'

const Modal = lazy(() => import('../../components/elements/Modal.jsx'));

export default function Code({code}) {

    const {showToast} = useContext(StateContext);

    return (
        <div className="flex rounded w-full mt-3">
            <div className={"px-2 bg-black text-gray-500 w-full md:w-11/12"}>
                <div>
                    <div className='flex flex-col justify-between'>
                        <h3 className="font-semibold sm:text-lg">{code.title}</h3>
                        <p>{code.description}</p>
                        <div className='ms-auto'>
                    
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
                    <motion.textarea initial={{ opacity: 1, scale: 1}} transition={{ duration: 2}} exit={{ opacity: 0, scale: 0}} className="w-full bg-gray-800 text-white min-h-[200px] relative overflow-auto" defaultValue={code.text} disabled />
                </motion.div>
            </div>
        </div>
    )
}

Code.propTypes = {
    code: PropTypes.object,
    commentHide: PropTypes.bool,
}
