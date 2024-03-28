import { collection, getDocs, query } from 'firebase/firestore';
import { lazy } from 'react';
import {useEffect, useState} from "react";
import { db } from '../../config/firebase';

const Code = lazy(() => import("./Code"));
const PageComponent = lazy(() => import("../../components/PageComponent"));
const TButton = lazy(() => import("../../components/TButton"));

export default function CodeIndex() {
    const [loading, setLoading ] = useState(false);
    const [allCodes, setAllCodes] = useState([]);

    const getAllCodes = async () => {
        try {
            const codeRef = collection(db, 'codes');
            const q = query(codeRef);
            const querySnapshot = await getDocs(q);
            const snippets = [];
            querySnapshot.forEach((doc) => {
                snippets.push({ ...doc.data(), id: doc.id });
            });
            console.log(snippets);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getAllCodes().then(() => {
            console.log("done");
        });
        setLoading(false);
    }, []);


    return (
        <PageComponent title="All Codes" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mine">
                    My Codes.
                </TButton>
            </div>
        )}>
            {/*Add filter section to filter the codes by the language*/}
            {
                !loading  &&
                <div className={"flex flex-col items-center sm:block"}>
                {
                    allCodes &&
                        allCodes.map((code, index) => (
                            <Code key={index} thecode={code} />
                        ))
                }
                {
                    allCodes.length === 0 &&
                        <div className="flex justify-center items-center">
                            No  Codes have been posted
                        </div>
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
