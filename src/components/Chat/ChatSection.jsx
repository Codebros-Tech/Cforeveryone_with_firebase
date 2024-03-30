import {CameraIcon, MoreHorizontal, PlusIcon} from "lucide-react";
import {lazy} from "react";

const Messages = lazy(() => import("@/src/components/Chat/Messages.jsx"));

export default function ChatSection () {
    return (
        <div className={"flex-[2]"}>
            <div className={"flex items-center justify-between p-3 text-[lightGray] h-[50px] bg-[#5d5b8d]"}>
                <span>Jane</span>
                <div className={"flex items-center gap-3"}>
                    <CameraIcon className={"cursor-pointer"} size={24} />
                    <PlusIcon  className={"cursor-pointer"} size={24} />
                    <MoreHorizontal className={"cursor-pointer"} size={24} />
                </div>
            </div>
            <Messages />
        </div>
    )
}