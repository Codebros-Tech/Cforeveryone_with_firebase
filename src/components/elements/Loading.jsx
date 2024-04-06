import {Rings} from "react-loader-spinner";

export default function Loading() {
    return (
        <div className={"h-[70%] flex items-center justify-center"}>
            <Rings height={330} width={380}  />
        </div>
    )
}