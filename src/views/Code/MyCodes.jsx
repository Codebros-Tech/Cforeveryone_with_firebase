import {lazy, Suspense} from 'react';

const Code = lazy(() => import("./Code"));
const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

import { StateContext } from "../../contexts/ContextProvider";
import {getUserCodes} from "../../firebase/code.js";
import { useContext, useEffect, useState } from "react";

export default function MyCodes() {
    const [loading, setLoading] = useState(false);
    const { myCodes, setMyCodes } = useContext(StateContext);

    useEffect(() => {
        const fetcher = async () => {
            try {
                setLoading(true);
                const codes = await getUserCodes();
                setMyCodes(codes);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetcher();
    }, []);

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
                    loading &&
                    <div className="flex items-center justify-center">
                        Patience is the key to a good life...
                    </div>
                }
                {
                    !loading &&
                    <div>
                        {
                            myCodes && myCodes.length > 0 &&
                            myCodes.map((code, index) => (
                                <Code key={index} code={code} />
                            ))
                        }
                        {
                            myCodes.length === 0 &&
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
