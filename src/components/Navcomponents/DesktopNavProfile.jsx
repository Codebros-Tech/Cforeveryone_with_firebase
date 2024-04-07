import {Menu, Transition} from "@headlessui/react";
import {Fragment, useContext} from "react";
import {Link} from "react-router-dom";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";
import {logoutUser} from "@/src/firebase/user.js";

export default function DesktopNavProfile() {
    const {currentUser} = useContext(StateContext);

    return currentUser && (
        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">

                <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button
                            className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={currentUser.photoURL} alt=""/>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                <Link
                                    to={"/users/"+currentUser.uid}
                                    className='block px-4 py-2 text-sm text-gray-700'
                                >
                                    My Info
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    to="#"
                                    onClick={() => logoutUser()}
                                    className='block px-4 py-2 text-sm text-gray-700'
                                >
                                    Sign Out
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}