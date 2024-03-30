export default function Message() {
    return (
        <div className={"flex items-center"}>
            <div className={"flex items-center"}>
                <img
                    alt={"Message Info"}
                     src={"https://lh3.googleusercontent.com/a/ACg8ocJ47z4BhLt8WeK4LnB17u55YZZizu4m4HJ0b3HxJUyLyg=s96-c"}
                />
                <span>just now</span>
            </div>
            <div className={"flex items-center"}>
                <p>Hello</p>
                <img
                    src={"https://lh3.googleusercontent.com/a/ACg8ocJ47z4BhLt8WeK4LnB17u55YZZizu4m4HJ0b3HxJUyLyg=s96-c"}
                    alt={"Image from user."}
                />
            </div>
        </div>
    )
}