import {useSelector} from "react-redux";


export default function ReducerPage() {
    const users = useSelector((state) => state.users);
    console.log(users);
    return (
        <div>
            From reducer
        </div>
    )
}