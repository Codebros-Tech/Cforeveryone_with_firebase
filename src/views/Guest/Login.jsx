import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/src/config/firebase.js";
import {addFeedback, handleLoginWithGoogle} from "@/src/firebase/user.js";
import {motion} from 'framer-motion'


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setError(null);
    }, [email, password]);

    async function handleLoginWithEmailAndPassword(event) {
        event.preventDefault();
        try {
           if (email && password) {
               const result = await signInWithEmailAndPassword(auth, email, password);
               const user = result.user;
               navigate('/dashboard');
           }
        } catch (error) {

            switch (error.code) {
                case 'auth/invalid-credential':
                    setError("Wrong Credentials ");
                    break;
                case 'auth/too-many-requests':
                    setError("Too many Request, Try again later")
                    break;
                case 'auth/network-request-failed':
                    setError("Poor Network Issues");
                    break;
                default:
                    await addFeedback(error.code.toString() + "Occurred ");
                    break;
            }
        }

    }

    return (
        <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                Sign in to Account
            </h2>

            {
                error &&
                <motion.div
                    initial={{
                        y: -20,
                    }}
                    animate={{
                        y: 0,
                    }}
                    className={"bg-red-800 py-2 rounded-md text-white w-12/12 min-h-[30px] px-6 mt-5"}>
                    {error}
                </motion.div>
            }

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                <form className="space-y-6" onSubmit={handleLoginWithEmailAndPassword}>
                    <div>
                        <label htmlFor="#email" className="block text-sm font-medium leading-6">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                className="input input-bordered w-full "
                                id={'email'}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6">
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
                                value={password}
                                onChange={(event) => setPassword(event.target.value) }
                                autoComplete={'current-password'}
                                className="input input-bordered w-full "
                                required
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

                    <p className="mt-10 text-center text-sm">
                    Don&rsquo;t have an Account?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create One
                    </Link>
                </p>
            </div>
        </div>
    )
}
