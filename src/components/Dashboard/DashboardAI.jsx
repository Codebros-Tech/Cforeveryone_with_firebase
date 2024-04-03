import {useContext, useState} from "react";
import OpenAI from "openai";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";
import { config } from 'dotenv'

export default function DashboardAI() {
    const {showToast} = useContext(StateContext);
    const [choice, setChoice] = useState({});
    const [question, setQuestion] = useState("");
    const OPENAI_API_KEY = import.meta.env.VITE_API_OPENAI_KEY;
    const [loadingCode, setLoadingCode] = useState(false);
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    console.log(process.env)

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

    return (
        <div className="px-4">
            <h1>My AI helper</h1>
            <p>Can be used to generate your code or ask any questions or worries you have on any
                subjects.</p>
            <div>
                <textarea className="w-full" value={question} onChange={(ev) => setQuestion(ev.target.value)}/>
                <button onClick={() => main(question)} className="p-3 bg-blue-500 text-white" disabled={loadingCode && true}>Send requests</button>
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
    )
}