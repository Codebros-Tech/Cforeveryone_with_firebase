export default function Search() {
    return (
        <div>
            <div className={"p-3"}>
                <input placeholder={"Find A User."} type="text" className={"bg-transparent border-none text-white"}  />
            </div>
            <div className={"flex p-3 gap-3 text-white hover:bg-[#2f2d52] cursor-pointer items-center"}>
                <img className={"w-[50px] h-[50px] rounded-[50%]"} src={"/notknown.jpg"}  alt={"User Image"}/>
                <div>
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}