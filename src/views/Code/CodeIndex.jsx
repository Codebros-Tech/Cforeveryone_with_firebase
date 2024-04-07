import {lazy, Suspense} from 'react';
import {useEffect, useState} from "react";
import {collection, getDocs, query} from 'firebase/firestore';
import { db } from '../../config/firebase';
import {Link} from "react-router-dom";

const  Loading = lazy(() => import("@/src/components/elements/Loading.jsx"));
const Code = lazy(() => import("./Code"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

export default function CodeIndex() {
    const [loading, setLoading ] = useState(true);
    const [allCodes, setAllCodes] = useState([]);

    useEffect(() => {
        const getAllCodes = async () => {
            try {
                setLoading(true);
                const codeCollection = collection(db, 'codes');
                const q = query(codeCollection);
                const querySnapshot = await getDocs(q);
                const fetchedCodes = querySnapshot.docs.map( (doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                });

                setAllCodes(fetchedCodes);
            
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }
        }

        getAllCodes();
    }, []);


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
                    <Link className={"btn btn-primary text-white"} to={'/codes/create'}>
                        Create Code.
                    </Link>
                </div>

                {
                    !loading &&
                    <div className={"grid lg:grid-cols-2 gap-x-2.5 items-center"}>
                        {
                            allCodes.map((code, index) => (
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
