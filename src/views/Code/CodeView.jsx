import { lazy } from 'react';
import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const PageComponent = lazy(() => import( "../../components/PageComponent.jsx"));
const TButton = lazy(() => import( "../../components/TButton.jsx"));
const Code = lazy(() => import( './Code.jsx'));
const Comment = lazy(() => import('./Comment.jsx'));

import {
    addCodeComment,
    addUserToCodeViewers,
    getCodeById,
    getCodeComments,
} from "../../firebase/code.js";
import {auth} from "../../config/firebase.js";

export default function CodeView() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});
    const [startTime, setStartTime ] = useState(0.0);
    const commentRef = useRef(null);

    const getComments = async () => {
        const fetchedComments = await getCodeComments(id);
        setComments(fetchedComments);
    }

    useEffect(() => {
        getComments();
    }, []);

    const getCodeInstance = async () =>  {
        const codeInstance = await getCodeById(id);
        setCode(codeInstance);
    }

    useEffect(() => {
        setLoading(true);
        getCodeInstance();

        const initialTime = performance.now();
        setStartTime(initialTime);

        return () => {
            sendRequest()
        }
    }, [id]);

    const sendRequest = () => {
        const endTime = performance.now();
        const durationFloat = (endTime - startTime) / 1000;
        const duration =  durationFloat.toFixed(0);

        addUserToCodeViewers(id, auth.currentUser.uid, duration).then(r => console.log("user has been added to viewed users ", r));
    }
    const submitComment = (ev) => {
        ev.preventDefault();
        const comment = commentRef.current.value;
        commentRef.current.value = "";
        addCodeComment(id, comment).then(r => console.log("Comment added to the code."));
    }

    return (
        <PageComponent title={code.title ?? "Code has no title"} buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mine">
                    My Codes.
                </TButton>
            </div>
        )
        }
        small={`${code.description}`}
        >
            {
                !loading  &&
                <div>
                    <div className={"flex flex-col items-center sm:block"}>
                        <Code thecode={code} commentHide/>
                    </div>
                    <form onSubmit={submitComment}>
                        <div className="w-full relative">
                            <div className="relative">
                                <textarea ref={commentRef} className="w-full py-3 pe-14" placeholder="Type the comment here." />
                            </div>
                            <button type="submit" className="flex items-center border-1 bg-blue-500 text-white py-2 rounded-[30px] text-xl absolute right-0 top-[10px]  ">
                                <PaperAirplaneIcon width={45} height={30} color="white" />
                            </button>
                        </div>
                    </form>
                    {
                        comments &&
                            <div className="max-w-[1200px] h-[70vh] overflow-auto border-2  mx-auto px-2 py-4">
                                {
                                    comments.map((comment, index) => (
                                        <div key={index}>
                                            <Comment comment={comment} />
                                        </div>
                                    ))
                                }
                            </div>
                    }
                    {
                        comments.length === 0 &&
                            <div className="flex justify-center items-center">
                                This code does not have any comments
                            </div>
                    }
                </div>
            }
            {
                loading &&
                    <div className="flex items-center justify-center">
                        Patience is the key to a good life....
                    </div>
            }
        </PageComponent>
    )
}
