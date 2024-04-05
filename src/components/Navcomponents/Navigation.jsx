import {lazy, Suspense, useContext} from "react";

const DesktopNavName = lazy(()=> import("@/src/components/Navcomponents/DesktopNavName.jsx"));
const DesktopNavProfile = lazy(() => import("@/src/components/Navcomponents/DesktopNavProfile.jsx"));
const MobileMenuButton = lazy(() => import("@/src/components/Navcomponents/MobileMenuButton.jsx"));
const MobileNavigation = lazy(() => import("@/src/components/Navcomponents/MobileNavigation.jsx"));
import {Disclosure} from "@headlessui/react";
import {StateContext} from "@/src/contexts/ContextProvider.jsx";

export default function Navigation() {
    const {currentUser} = useContext(StateContext);
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <Suspense fallback={<div>Loading from Navigation</div>}>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <DesktopNavName />
                            {
                                currentUser &&
                                <DesktopNavProfile />
                            }
                            <MobileMenuButton open={open} />
                        </div>
                    </div>

                    <MobileNavigation />
                </Suspense>
            )}
        </Disclosure>
    )
}