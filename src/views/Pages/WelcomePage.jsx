import { Link } from "react-router-dom"
import {motion} from 'framer-motion';

export default function WelcomePage () {
    return (
        <div className="relative isolate px-6 animate-fade-in-down lg:px-8">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',}}/>
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:pt-36 lg:pt-40  ">
                    <div
                        className="text-center">
                        <motion.h1
                            initial={{
                                top: 100,
                                scale: 0.4,
                            }}
                            animate={{
                                top: 0,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Connect, Build & Thrive <br />
                            with people on {import.meta.env.VITE_APP_NAME}
                        </motion.h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {import.meta.env.VITE_APP_NAME} is everyone is here to remove all of the issues students face in learning the C programming language. Making it easy for students to track their progress, share their work and build together in a community.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/codes" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',}}/>
            </div>
        </div>
    )
}
