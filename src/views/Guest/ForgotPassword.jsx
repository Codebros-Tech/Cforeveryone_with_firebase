import {useState} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');

    const resetPassword = async () => {

    }

    return (
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            <div className={""}>
                Verification Link Sent
            </div>

            <form className="space-y-6" onSubmit={resetPassword}>
                <div>
                    <div className="mt-2">
                        <input
                            className="input input-bordered w-full "
                            id={'email'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder={"Type Email"}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                            Send Password Reset Link
                        </button>
                    </div>

                    <div className={"mt-6 flex justify-center"}>
                        <Link className={"flex items-center gap-x-4"} to={'/login'}>
                            <ArrowLeft /> Navigate back to login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}