import {lazy} from 'react';

const Code = lazy(() => import("./Code"));
const PageComponent = lazy(() => import("../../components/PageComponent"));
const TButton = lazy(() => import("../../components/TButton"));
import { StateContext } from "../../contexts/ContextProvider";
import {getUserCodes} from "../../firebase/code.js";
import { useContext, useEffect, useState } from "react";

export default function MyCodes() {
    const [loading, setLoading] = useState(false);
    const { myCodes, setMyCodes } = useContext(StateContext);

    const getUserCodeInstance = async () => {
        const userCodes = await getUserCodes();
        setMyCodes(userCodes);
    }

    useEffect(() => {
        setLoading(true);
        getUserCodeInstance().then(r => console.log('get the user code instance', r));
        setLoading(false);
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
                    myCodes &&
                        myCodes.map((code, index) => (
                            <Code key={index} thecode={code} />
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
        </PageComponent>
    )
}
