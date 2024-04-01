import { useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/src/config/firebase.js";
import {handleLoginWithGoogle} from "@/src/firebase/user.js";

export default function Login() {
    const emailRef= useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleLoginWithEmailAndPassword(event) {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to Account
            </h2>

            {
                error &&
                <div className={"mx-auto bg-red-800 py-2 rounded-md text-white w-5/12 px-6 mt-5"}>
                   Something went wrong.
                </div>
            }

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={handleLoginWithEmailAndPassword}>
                    <div>
                        <label htmlFor="#email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                id={'email'}
                                ref={emailRef}
                                type="email"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="/forgot-password"
                                      className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                autoComplete={'current-password'}
                                required
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className={"mx-auto"}>
                    <button onClick={() => handleLoginWithGoogle().then(() => navigate('/dashboard'))}
                            className={"py-2 my-4 bg-blue-500 text-white px-2"}>Login with
                        Google
                    </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don&rsquo;t have an Account?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create One
                    </Link>
                </p>
            </div>
        </>
    )
}
