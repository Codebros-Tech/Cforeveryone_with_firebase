import {lazy, useEffect, useState} from "react"
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "@/src/config/firebase.js";

const Loading = lazy(() => import("@/src/components/elements/Loading.jsx"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const User = lazy(() => import("./User"))

export default function People() {
    const [users , setUsers] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'users'),
            (snapshot) => {
                const users = [];
                snapshot.forEach((doc) => {
                    users.push({uid: doc.id, ...doc.data()})
                })
                setUsers(users);
            },
            (error) => {
                setError(true);
            }
        )

        return () => {unsubscribe()}
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
