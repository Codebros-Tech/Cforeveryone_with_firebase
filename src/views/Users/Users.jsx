import {lazy, useEffect, useState} from "react"
import {getAllUsers} from "../../firebase/user.js";

const Loading = lazy(() => import("@/src/components/elements/Loading.jsx"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const User = lazy(() => import("./User"))

export default function People() {
    const [users , setUsers] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(false)

    const getAllUserInstance = async () => {
        try {
            setLoading(true);
            const users = await getAllUsers();
            setUsers(users);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        getAllUserInstance()
    }, [])

    return (
        <PageComponent title="Find People" small="Find other people on the platform.">
            {
                !loading &&
                <div className="grid sm:grid-cols-2">
                    {
                        users &&
                            users.map((user, index) => (
                                <User key={index} user={user} />
                            ))
                    }
                </div>
            }

            {
                error && <div>Something went wrong. Try refreshing the page.</div>
            }

            {
                loading && <Loading />
            }
        </PageComponent>
    )
}
