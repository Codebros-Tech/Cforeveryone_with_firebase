import {Fragment, lazy, useContext, useEffect, useState} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom'
import { StateContext} from "../../contexts/ContextProvider.jsx";
import {deleteUserAccount, logoutUser} from "../../firebase/user.js";
import {navigation} from "../../utils/utils.js";

const Toast = lazy(() => import('../../components/Toast'));
const Modal = lazy(() => import("../../components/Modal.jsx"));


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PrivateRoute() {
    const navigate = useNavigate();
    const { currentUser  } = useContext(StateContext);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, []);

    const modalTitle  = "Deactivate accounts";
    const modalText = "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."

    const [ modalState, setModalState] = useState(false);

    const deleteAccount =  (ev) => {
        ev.preventDefault();
        setModalState(true);
    }

    const deleteFun = () => {
        deleteUserAccount(currentUser.uid).then(r => console.log('account deleted', r));
    }

    const logout = async (ev) => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('error occurred when trying to log out the user');
        }
    }

    if (modalState) {
        return <Modal yesFunction={deleteFun} text={modalText} title={modalTitle} setModalState={setModalState} />
    }


    return (
        <>
            <div className='relative'>
                <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            {/*<img*/}
                            {/*    className="h-8 w-8"*/}
                            {/*    src="logo.svg"*/}
                            {/*    alt="Cforeveryone"*/}
                            {/*/>*/}
                            </div>
                            <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={({isActive}) => classNames(
                                    isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                    )}
                                >
                                    {item.name}
                                </NavLink>
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    {
                                        currentUser && currentUser.profile &&
                                        <img className="h-8 w-8 rounded-full" src={currentUser.profile} alt=""/>
                                    }
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <Link
                                            to="/myinfo"
                                            className='block px-4 py-2 text-sm text-gray-700'
                                        >
                                            My Info
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link
                                            onClick={(ev) => logout(ev)}
                                            to="#"
                                            className='block px-4 py-2 text-sm text-gray-700'
                                        >
                                            Sign Out
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link
                                            onClick={(ev) => deleteAccount(ev)}
                                            to="#"
                                            className='block px-4 py-2 text-sm text-red-700'
                                        >
                                            Delete Account
                                        </Link>
                                    </Menu.Item>
                                </Menu.Items>
                                </Transition>
                            </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                            </Disclosure.Button>
                        </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.to}
                                className={({isActive}) => classNames(
                                    isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                            >
                            {item.name}
                            </NavLink>
                        ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                {
                                    currentUser && currentUser.profile &&
                                    <img className="h-10 w-10 rounded-full" src={currentUser.profile} alt=""/>
                                }
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">{currentUser && currentUser.name && currentUser.name }</div>
                                <div className="text-sm font-medium leading-none text-gray-400">{currentUser &&  currentUser.email && currentUser.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <Disclosure.Button
                                onClick={(ev) => logout(ev)}
                                as="a"
                                href="#"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                Sign Out
                            </Disclosure.Button>
                        </div>
                        </div>
                    </Disclosure.Panel>
                    </>
                )}
                </Disclosure>

                <Outlet />

                <Toast />
            </div>
        </>
    )
}
