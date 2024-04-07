import {lazy, Suspense, useState} from 'react';

const Code = lazy(() => import("./Code"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

import { StateContext } from "../../contexts/ContextProvider";
import {getUserCodes} from "../../firebase/code.js";
import { useContext, useEffect } from "react";
const  Loading = lazy(() => import("@/src/components/elements/Loading.jsx"));

export default function MyCodes() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [myCodes, setMyCodes] = useState([]);
    const { currentUser } = useContext(StateContext);

    useEffect(() => {
        const fetcher = async () => {
            try {
                setLoading(true);
                const codes = await getUserCodes(currentUser);
                setMyCodes(codes);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetcher();
    }, [currentUser.uid]);

    return (
        <PageComponent title="My Codes" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes">
                    All Codes
                </TButton>
            </div>
        )}>
            <Suspense fallback={<div>Loading Component </div>}>
                {
                    loading && <Loading />
                }

                {
                    error &&
                    <div className={'bg-red-500 font-medium text white py-3 px-3'}>
                        Error occurred when fetching the data.
                    </div>
                }
                {
                    !loading &&
                    <div>
                        {
                            myCodes && myCodes.length > 0 &&
                            <div className={"grid lg:grid-cols-2 gap-x-2.5 items-center"}>
                                {
                                    myCodes.map((code, index) => (
                                        <Code key={index} code={code} />
                                    ))
                                }
                            </div>
                        }
                        {
                            !error && myCodes.length === 0 &&
                            <div className="flex justify-center items-center">
                                You have not posted Any codes yet.
                            </div>
                        }
                    </div>
                }
            </Suspense>
        </PageComponent>
    )
}
