import {File, ImageIcon} from "lucide-react";

export default function Input() {
    return (
        <div className={"mx-3 my-2 flex items-center"}>
            <input placeholder={"Type Your Message"} className={"p-3 text-sm font-medium h-12 bg-white w-full placeholder:text-black"} />
            <div className={"h-full flex items-center gap-3 px-2 "}>
                <input type={'file'} className={"hidden"} id={'file'}/>
                <label htmlFor={'file'}>
                    <File size={20} color={'white'} />
                </label>
                <button>
                    <ImageIcon size={24} color={'white'} />
                </button>
                <button className={"bg-blue-700 py-1 px-4 flex h-full text-white"}>
                    Send
                </button>
            </div>
        </div>
    )
}