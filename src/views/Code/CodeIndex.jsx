import Code from "./Code";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../contexts/ContextProvider";
import { getAllCodes} from '../../firebase/code.js';

export default function CodeIndex() {
    const [loading, setLoading ] = useState(false);

    const { allCodes, setAllCodes } = useContext(StateContext);
    const getCodes = async ()   => {
        const allCodes = await getAllCodes();
        setAllCodes(allCodes);
        console.log(allCodes);
    }

    useEffect(() => {
        setLoading(true);
        getCodes().then(r => {
            console.log(r);
        }).catch((error) => {
            console.error('error occred when fetching the codes' , error);
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
