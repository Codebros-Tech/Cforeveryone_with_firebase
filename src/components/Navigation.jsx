import {lazy} from "react";

const DesktopNavName = lazy(()=> import("@/src/components/DesktopNavName.jsx"));
const DesktopNavProfile = lazy(() => import("@/src/components/DesktopNavProfile.jsx"));
const MobileMenuButton = lazy(() => import("@/src/components/MobileMenuButton.jsx"));
const MobileNavigation = lazy(() => import("@/src/components/MobileNavigation.jsx"));
import {Disclosure} from "@headlessui/react";

export default function Navigation() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <DesktopNavName />
                            <DesktopNavProfile />
                            <MobileMenuButton open={open} />
                        </div>
                    </div>

                    <MobileNavigation />
                </>
            )}
        </Disclosure>
    )
}