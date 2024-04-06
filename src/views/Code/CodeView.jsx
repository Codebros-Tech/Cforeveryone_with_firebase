import {lazy, useContext} from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const PageComponent = lazy(() => import( "../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import( "../../components/elements/TButton.jsx"));
const Code = lazy(() => import( './Code.jsx'));
const Comment = lazy(() => import('./Comment.jsx'));
const NotFound = lazy(() => import("@/src/views/Pages/NotFound.jsx"))

import {addCodeComment, addUserToCodeViewers, getCodeById, getCodeComments} from "../../firebase/code.js";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";

export default function CodeView() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});
    const [startTime, setStartTime ] = useState(0.0);
    const [commentText, setCommentText] = useState("");

    const { currentUser, showToast  } = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        const codeFetcher = async () =>  {
            const code = await getCodeById(id);
            setCode(code);
            setLoading(false);
        }

        const commentFetcher = async () => {
            const commentsArray = await getCodeComments(id);
            setComments(commentsArray)
        }

        codeFetcher();

        commentFetcher();


        const initialTime = performance.now();
        setStartTime(initialTime);

        return () => {
            sendRequest()
        }
    }, [id]);

    const sendRequest = async () => {
        const endTime = performance.now();
        const durationFloat = (endTime - startTime) / 1000;
        const duration =  durationFloat.toFixed(0);

        addUserToCodeViewers(id, currentUser.uid, duration).then(r => console.log("user has been added to viewed users ", r));
    }

    const submitComment = async (ev) => {
        ev.preventDefault()
        setCommentText("")
        await addCodeComment(currentUser, id, commentText)
        showToast("Comment added");
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
                !loading  && code &&
                <div>
                    <div className={"flex flex-col items-center sm:block"}>
                        <Code numRows={13} code={code}/>
                    </div>
                    {
                        currentUser &&
                        <form onSubmit={submitComment}>
                            <div className="w-full relative">
                                <div className="relative">
                                    <textarea value={commentText} onChange={(ev) => setCommentText(ev.target.value)} className="w-full px-4 py-3 pe-14" placeholder="Type the comment here." />
                                </div>
                                <button type="submit" className="flex items-center border-1 bg-blue-500 text-white py-2 rounded-[30px] text-xl absolute right-0 top-[10px]  ">
                                    <PaperAirplaneIcon width={45} height={30} color="white" />
                                </button>
                            </div>
                        </form>
                    }
                    {
                        !currentUser &&
                        <div className={"block py-3 px-2 bg-blue-500 text-white"}>
                            <Link to={'/login'}>Login to comment</Link>
                        </div>
                    }
                    {
                        comments &&
                            <div className="max-w-[1200px] h-[70vh] overflow-auto border-2  mx-auto px-2 py-4">
                                {
                                    comments.map((comment, index) => (
                                        <div key={index}>
                                            <Comment codeId={id} comment={comment} />
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
                !code &&
                <NotFound />
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
