import {useContext, useRef} from "react";
import {addFeedback} from "../../firebase/user.js";
import {StateContext} from "@/src/contexts/UserProvider.jsx";
import {useNavigate} from "react-router-dom";
import Footer from "@/src/components/Footer.jsx";

export default function Contact() {
    const {currentUser, showToast} = useContext(StateContext);
    const descriptionRef = useRef(null);
    const navigate = useNavigate();

    const submitForm = async (ev) => {
        ev.preventDefault();

        try {
            const feedback = await addFeedback(descriptionRef.current.value, currentUser);
            descriptionRef.current.value = "";
            showToast("Well Received, Thank you " +  currentUser.displayName);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            console.error("Error sending the feedback");
        }
    }

    return (
        <div>
            <div className="max-w-4xl mt-[60px] flex items-center justify-center mx-auto">
                <form onSubmit={submitForm} className="w-full">
                    <div className="py-5 px-5  w-full min-h-[500px]">
                        <div className="grid grid-cols-1 mt-5 ms-2">
                            <label className={"dark:text-black"} htmlFor="name">Suggestions for improvements of the platform</label>
                            <textarea ref={descriptionRef} rows={10} className="md:cols-span-1 mt-2 px-4 py-2"
                                      placeholder="Type the text here"/>
                        </div>

                        <div className="flex items-center">
                            <button className="btn btn-primary text-accent-content px-5 py-3 ms-2 rounded-lg mt-2 hover:bg-blue-600"
                                    type="submit">Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
