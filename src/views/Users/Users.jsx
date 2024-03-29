import {lazy, useEffect, useState} from "react"
import {getAllUsers} from "../../firebase/user.js";

const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const User = lazy(() => import("./User"))

export default function People() {
    const [users , setUsers] = useState([]);
    const [loading , setLoading] = useState(false);

    const getAllUserInstance = async () => {
        try {
            const users = await getAllUsers();
            setUsers(users);
        } catch (error) {
            console.error('error fetching all the users', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getAllUserInstance().then(() => console.log('done fetching the users'));
        setLoading(false);
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
                loading &&
                <div className="flex items-center justify-center">
                    Patience is the key to a good life....
                </div>
            }
        </PageComponent>
    )
}
