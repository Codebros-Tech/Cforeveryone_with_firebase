import {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import { PhotoIcon } from '@heroicons/react/24/outline';
import {handleSignupWithEmailAndPassword} from "../../firebase/user.js";
import {StateContext} from "../../contexts/ContextProvider.jsx";

export default function Signup() {
    const { showToast } = useContext(StateContext);
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const emailRef= useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState({
        message: null,
    });

    const submitForm = (ev) => {
        ev.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            passwordConfirmationRef.current.focus = true;
            setError({
                message: "Passwords do not match",
            });

            return;
        }

        handleSignupWithEmailAndPassword(
            nameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value,
        ).then(response => {
            showToast("Account Created Successfully");
            console.log(response);
            navigate('/dashboard');
        })
    }

    const onImageChoose = (ev) => {
        // returns the file that the user entered, in this case its an image.
        const file = ev.target.files[0];

        // this is the function that reads the image.
        const reader = new FileReader();

        // when the reader loads, it will contain a variable that contains the result.
        reader.onload = () => {
            setImageData(reader.result);

            ev.target.value = ""; // we then emptied the component containing the image.
        }

        reader.readAsDataURL(file);
    }

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your account and start coding
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {
                    error.label &&
                    <div className="bg-red-500 rounded py-2 px-3 text-white">
                        {error.message}
                    </div>
                }

                <form className="space-y-6" onSubmit={submitForm}>

                    <div className="mt-1 flex items-center">
                        {
                            imageData &&
                                <img
                                    src={imageData}
                                    alt=""
                                    className="w-40 h-40 object-cover"
                                />
                        }
                        {
                            !imageData &&
                                <span className="flex items-center justify-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    <PhotoIcon className='w-10 h-10'/>
                                </span>
                        }
                        <button
                            type="button"
                            className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4
                            text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:indigo-500 focus:ring-offset-2"
                        >
                            <input
                                type="file"
                                className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                                onChange={onImageChoose}
                            />
                            Change
                        </button>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                        </label>
                        <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            ref={nameRef}
                            autoComplete="name"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            ref={emailRef}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                ref={passwordRef}
                                type="password"
                                autoComplete="new-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="#password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                Password Confirmation
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password_confirmation"
                                type="password"
                                ref={passwordConfirmationRef}
                                autoComplete={"password"}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Create Account
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login Here.
                </Link>
                </p>
            </div>
        </>
    )
  }
