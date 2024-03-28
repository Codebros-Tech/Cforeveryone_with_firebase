import {lazy, useContext, useEffect, useState} from "react";
import OpenAI from "openai";
import { StateContext } from "../../contexts/ContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const PageComponent = lazy(
    () => import("../../components/PageComponent"));
const TButton = lazy(() => import("../../components/TButton"));

export default function Dashboard() {
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(StateContext);

    const {showToast} = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        getDashboardInformation(currentUser.uid);
        setLoading(false);
    }, [currentUser.uid]);


    const [choice, setChoice] = useState({});
    const [question, setQuestion] = useState("");
    const OPENAI_API_KEY = import.meta.env.VITE_API_OPENAI_KEY;
    const [loadingCode, setLoadingCode] = useState(false);
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    async function main(text) {
        setLoadingCode(true);
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": text},
                {"role": "user", "content": "Generate the C codes only without explanations"}],
            model: "gpt-3.5-turbo",
        }).catch((error) => {
            setLoadingCode(false);
            console.log(error);
            showToast((JSON.stringify(error)));
        });

        console.log(completion.choices[0]);
        setChoice(completion.choices[0])
        setLoadingCode(false);
    }


    const getDashboardInformation = async (id) => {
        try {
            const codeRef = collection(db, 'codes');
            if (id) {
                const userCodesQuery = query(codeRef, where('user_id', '==', id));
                const querySnapshot = await getDocs(userCodesQuery)
                const codes = [];
                querySnapshot.forEach((doc) => {
                    codes.push({ ...doc.data(), id: doc.id });
                });

                setDashboardInfo({
                    codes: codes.length
                });
            }
        } catch (error) {
          //
        }
    }


    return (
        <PageComponent title="Dashboard" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/mine">
                    My Codes
                </TButton>
                <TButton color='green' to="/codes">
                    All Codes
                </TButton>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
            </div>
        )}>
            {
                !loading &&
                <div>
                    <div className="max-w-6xl grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-3 text-center font-bold">
                        <div className="shadow-sm">
                            <h3>Codes Posted</h3>
                            <h1 className="text-[40px]">{dashboardInfo.codes}</h1>
                        </div>

                        {/* <div className="shadow-sm">
                            <h3>People you helped</h3>
                            <h1 className="text-[40px]">5</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Total Likes</h3>
                            <h1 className="text-[40px]">0</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Total Points</h3>
                            <h1 className="text-[40px]">0</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Quizes Taken</h3>
                            <h1 className="text-[40px]"></h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Suggestions Made</h3>
                            <h1 className="text-[40px]"></h1>
                        </div> */}
                    </div>

                    <div className="w-full mt-5 flex items-center justify-center">
                        <div className="w-11/12 bg-white sm:p-5 py-5">
                            <div>
                                <h4 className="text-[25px]">Skill path</h4>

                                <div className="font-bold text-[16px]">
                                    Your current Level
                                </div>
                            </div>

                            <div
                                className="flex w-full h-4 overflow-hidden font-sans text-xs font-medium rounded-full flex-start bg-blue-gray-50">
                                <div
                                    className="flex items-center justify-center w-[80%] h-full overflow-hidden text-white break-all bg-gray-900 rounded-full ">
                                    80% Completed
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4">
                        <h1>My AI helper</h1>
                        <p>Can be used to generate your code or ask any questions or worries oyou have on any
                            subjets.</p>
                        <div>
                        <textarea className="w-full" value={question}
                                    onChange={(ev) => setQuestion(ev.target.value)}/>
                            <button onClick={() => main(question)} className="p-3 bg-blue-500 text-white"
                                    disabled={loadingCode && true}>Send requests
                            </button>
                        </div>
                        {
                            !loadingCode &&
                            <div>
                            <textarea className="border-0 w-full mt-5 min-h-[500px]"
                                        value={choice.message && choice.message.content} disabled></textarea>
                            </div>
                        }
                        {
                            loadingCode &&
                            <div className="flex items-center justify-center">
                                Your Request is being generated
                            </div>
                        }
                    </div>
                </div>
            }
            {
                loading &&
                <div className="flex flex-col gap-2">
                    Patients Brother.
                </div>
            }
        </PageComponent>
    )
}
