import {useContext, useState} from "react";
import OpenAI from "openai";
import {StateContext} from "@/src/contexts/UserProvider.jsx";
import { GoogleGenerativeAI} from "@google/generative-ai";

export default function DashboardAI() {
    const [result, setResult] = useState("");
    const [question, setQuestion] = useState("");
    const GEMINI_API_KEY = import.meta.env.VITE_API_GEMINI_KEY;
    const [loadingCode, setLoadingCode] = useState(false);
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    async function run() {
        setLoadingCode(true);
        const result = await model.generateContentStream("Write a C programming code to do the following task " +question);
        let text = "";

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
            setResult(text);
        }
        setLoadingCode(false);
    }

    return (
        <div className="px-4 text-black pb-3">
            <h1>My AI helper</h1>
            <p>Can be used to generate your code or ask any questions or worries you have on any subjects.</p>
            <div>
                <textarea className="w-full px-3 py-2 text-white" value={question} onChange={(ev) => setQuestion(ev.target.value)}/>
                <button onClick={() => run()} className="p-3 bg-blue-500 text-white" disabled={loadingCode && true}>Send requests</button>
            </div>
            <textarea className="border-0 bg-gray-700 text-white w-full mt-5 min-h-[400px] px-3" value={result} disabled></textarea>
        </div>
    )
}