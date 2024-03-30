export default function UserProfileDetail() {
    return (
        <div className={"flex p-3 gap-3 text-white hover:bg-[#2f2d52] cursor-pointer items-center"}>
            <img className={"w-[50px] h-[50px] rounded-[50%]"}
                 src={"https://lh3.googleusercontent.com/a/ACg8ocJ47z4BhLt8WeK4LnB17u55YZZizu4m4HJ0b3HxJUyLyg=s96-c"}
                 alt={"User Image"}/>
            <div>
                <span className={"text-lg font-medium"}>Jane</span>
                <p className={"text-sm text-[lightGray]"}>Hello</p>
            </div>
        </div>
    )
}