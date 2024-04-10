import {useContext, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import { PhotoIcon } from '@heroicons/react/24/outline';
import {StateContext} from "../../contexts/UserProvider.jsx";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, storage} from "@/src/config/firebase.js";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {handleLoginWithGoogle, storeUserInformation} from "@/src/firebase/user.js";


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
    const [file, setFile] = useState(null);

    const submitForm = async  (ev) => {
        ev.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value;

        if (password !== passwordConfirmation) {
            passwordConfirmationRef.current.focus = true;
            setError({
                message: "Passwords do not match",
            });

            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            const profileUpdates = {displayName: name.toLowerCase()};
            await updateProfile(auth.currentUser, profileUpdates);

            const storageRef = ref(storage, user.uid);
            const uploadTask = uploadBytesResumable(storageRef, file);

            if (file) {
                uploadTask.on(
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                            try {
                                await updateProfile(user,{
                                    photoURL: downloadUrl
                                })
                                await storeUserInformation(user, downloadUrl);
                            } catch (error) {
                                console.error(error);
                            }
                        })
                    }
                )
            }

            showToast("Account Created Successfully");
            navigate('/dashboard');
        } catch(error) {
            console.error(error);
        }
    }

    const onImageChoose = (event) => {
        setFile(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setImageData(reader.result);
            event.target.value = "";
        }
    }

    return (
        <div className={"dark:text-white"}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                Create your account and start coding
            </h2>
            <div className={"flex items-center"}>
                <button
                    type="submit"
                    onClick={() => {handleLoginWithGoogle().then(() => navigate('/dashboard'))}}
                    className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Continue with Google
                </button>
            </div>
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
                                onChange={(event) => {
                                    onImageChoose(event)
                                }}
                            />
                            Change
                        </button>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                        Name
                        </label>
                        <div className="mt-2">
                        <input
                            id="name"
                            type="text"
                            ref={nameRef}
                            autoComplete="name"
                            required
                            className="input input-bordered w-full "
                        />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6">
                        Email address
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            ref={emailRef}
                            required
                            className="input input-bordered w-full "
                        />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6">
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
                                className="input input-bordered w-full "
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="#password_confirmation" className="block text-sm font-medium leading-6">
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
                                className="input input-bordered w-full "
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

                <p className="mt-10 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login Here.
                </Link>
                </p>
            </div>
        </div>
    )
  }
