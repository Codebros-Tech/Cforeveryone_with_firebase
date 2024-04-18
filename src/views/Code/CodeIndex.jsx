import {lazy, Suspense, useEffect} from 'react';
import {useState} from "react";
import {collection, onSnapshot} from 'firebase/firestore';
import { db } from '../../config/firebase';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {addCode} from "@/src/reducers/CodeReducer.js";

const  Loading = lazy(() => import("@/src/components/elements/Loading.jsx"));
const Code = lazy(() => import("./Code.jsx"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

export default function CodeIndex() {
    const dispatch = useDispatch();
    const [loading, setLoading ] = useState(false);
    const codes = useSelector((state) => state.codes);


    useEffect(() => {
        setLoading(true);
       const unsubscribe = onSnapshot(
           collection(db, 'codes'),
           (snapshot) => {
                snapshot.forEach((doc) => {
                    dispatch(addCode({id: doc.id, ...doc.data()}));
                })

                setLoading(false);
           },
           (error) => {
               console.error(error);
           }
       )

        return () => unsubscribe();
    }, []);

    useEffect(() => {

        console.log("The values of the code is ", codes);
    }, [codes]);


    return (
        <Suspense fallback={<Loading />}>
            <PageComponent title="All Codes" buttons={(
                <div className='flex gap-2'>
                    <TButton color='green' to="/codes/mine">
                        My Codes
                    </TButton>
                    <TButton color='green' to="/codes/create">
                        New
                    </TButton>
                </div>
            )}>
                <div className={"flex items-center mt-5 justify-center"}>
                    <Link className={"btn btn-primary text-white rounded-full px-6"} to={'/codes/create'}>
                        Create Code.
                    </Link>
                </div>

                {
                    !loading &&
                    <div className={"grid lg:grid-cols-2 gap-x-2.5 items-center"}>
                        {
                            codes.map((code, index) => (
                                <Code key={index} code={code}/>
                            ))
                        }
                    </div>
                }
                {
                    loading && <Loading/>
                }
            </PageComponent>
        </Suspense>
    )
}
