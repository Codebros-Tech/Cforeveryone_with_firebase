import { lazy } from 'react';
import {useEffect, useState} from "react";
import { collection, getDocs, query  } from 'firebase/firestore';
import { db } from '../../config/firebase';

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
                const fetchedCodes = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(), 
                  }));
            
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
        <PageComponent title="All Codes" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
            </div>
        )}>

            {
                !loading  &&
                <div className={"flex flex-col items-center sm:block"}>
                    {
                        allCodes.map((code, index) => (
                            <Code key={index} code={code} />
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
