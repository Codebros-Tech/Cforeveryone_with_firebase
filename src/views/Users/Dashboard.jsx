import {lazy, useContext, useEffect, useState} from "react";
import { StateContext } from "../../contexts/ContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
const DashboardAI = lazy(() => import("@/src/components/Dashboard/DashboardAI.jsx"));

const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

export default function Dashboard() {
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        getDashboardInformation(currentUser.uid);
        setLoading(false);
    }, [currentUser.uid]);


    const getDashboardInformation = async (id) => {
        try {
            const codeRef = collection(db, 'codes');
            if (id) {
                const userCodesQuery = query(codeRef, where('userId', '==', id));
                const querySnapshot = await getDocs(userCodesQuery)
                const codes = [];
                querySnapshot.forEach((doc) => {
                    codes.push({ ...doc.data(), id: doc.id });
                });

                setDashboardInfo({
                    codes: codes.length
                });
            }
        } catch (error) {
          //
        }
    }


    return (
        <PageComponent title="Dashboard" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/mine">
                    My Codes
                </TButton>
                <TButton color='green' to="/codes">
                    All Codes
                </TButton>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
            </div>
        )}>
            {
                !loading &&
                <div>
                    <div className="max-w-6xl grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-3 text-center font-bold">
                        <div className="shadow-sm">
                            <h3>Codes Posted</h3>
                            <h1 className="text-[40px]">{dashboardInfo.codes}</h1>
                        </div>
                    </div>

                    <div className="w-full mt-5 flex items-center justify-center">
                        <div className="w-11/12 bg-white sm:p-5 py-5">
                            <div>
                                <h4 className="text-[25px]">Skill path</h4>

                                <div className="font-bold text-[16px]">
                                    Your current Level
                                </div>
                            </div>

                            <div
                                className="flex w-full h-4 overflow-hidden font-sans text-xs font-medium rounded-full flex-start bg-blue-gray-50">
                                <div
                                    className="flex items-center justify-center w-[80%] h-full overflow-hidden text-white break-all bg-gray-900 rounded-full ">
                                    80% Completed
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<DashboardAI />*/}
                </div>
            }
            {
                loading &&
                <div className="flex flex-col gap-2">
                    Patients Brother.
                </div>
            }
        </PageComponent>
    )
}
