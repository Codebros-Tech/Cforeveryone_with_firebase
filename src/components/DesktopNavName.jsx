import {NavLink} from "react-router-dom";
import {classNames, navigation} from "@/src/utils/constant.js";

export default function DesktopNavName() {
    return (
        <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-2xl lg:text-3xl">
                Cforeveryone
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
                                    : 'text-gray-300 whitespace-nowrap hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}