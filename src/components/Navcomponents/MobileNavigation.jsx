import {classNames, navigation} from "@/src/utils/constant.js";
import {Link, NavLink} from "react-router-dom";
import {Disclosure} from "@headlessui/react";
import {logoutUser} from "@/src/firebase/user.js";
import {useContext} from "react";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";

export default function MobileNavigation() {
    const {currentUser} = useContext(StateContext);
    return (
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
            {
                currentUser &&
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <Link to={'/'} className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={currentUser.photoURL} alt=""/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{currentUser.displayName}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                        </div>
                    </Link>
                    <div className="mt-3 space-y-1 px-2">
                        <Disclosure.Button
                            onClick={() => logoutUser()}
                            as="button"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                            Sign Out
                        </Disclosure.Button>
                    </div>
                </div>
            }
        </Disclosure.Panel>
    )
}