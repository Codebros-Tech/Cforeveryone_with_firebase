import PropTypes from "prop-types";

export default function Message({owner}) {
    return (
        <div className={`flex items-center gap-3 mb-5 ${owner && 'flex-row-reverse'}`}>
            <div className={"gap-2 flex flex-col text-[gray] font-light"}>
                <img className={"w-10 h-10 rounded-[50%] object-cover"}
                    alt={"Message Info"}
                     src={"https://lh3.googleusercontent.com/a/ACg8ocJ47z4BhLt8WeK4LnB17u55YZZizu4m4HJ0b3HxJUyLyg=s96-c"}
                />
                <span className={"whitespace-nowrap"}>just now</span>
            </div>
            <div className={'max-w-[80%] flex  flex-col gap-2.5'}>
                <p className={`rounded-br-xl max-w-[max-content] rounded-bl-xl py-2.5 px-5 ${owner ? 'bg-[#8da4f1] text-white rounded-tl-xl' : 'rounded-tr-xl bg-white'}`}>Hello</p>
                {/*<img className={"w-[50%] h-auto"}*/}
                {/*    src={"https://lh3.googleusercontent.com/a/ACg8ocJ47z4BhLt8WeK4LnB17u55YZZizu4m4HJ0b3HxJUyLyg=s96-c"}*/}
                {/*    alt={"Image from user."}*/}
                {/*/>*/}
            </div>
        </div>
    )
}

Message.propTypes = {
    owner: PropTypes.bool,
}