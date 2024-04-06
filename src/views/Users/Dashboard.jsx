import {lazy, useContext, useEffect, useState} from "react";
import { StateContext } from "../../contexts/ContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import {Rings, Watch} from 'react-loader-spinner'
import {Navigate} from "react-router-dom";

const DashboardAI = lazy(() => import("@/src/components/Dashboard/DashboardAI.jsx"));

const PageComponent = lazy(() => import("../Layouts/PageComponent.jsx"));
const TButton = lazy(() => import("../../components/elements/TButton.jsx"));

export default function Dashboard() {
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const {currentUser} = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        currentUser && getDashboardInformation(currentUser.uid);
        setLoading(false);
    }, [currentUser]);


    const getDashboardInformation = async (id) => {
        try {
            const codeCollection = collection(db, 'codes');
            if (id) {
                const countQuery = query(codeCollection, where("userId", "==", id));
                const snapshot = await getDocs(countQuery);
                const size = snapshot.size;
                setDashboardInfo({
                    codes: size,
                });
            }
        } catch (error) {
          console.error("Error fetching the dashboard information ", error);
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
                <div className={"py-10"}>
                    <div className="max-w-6xl grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-3 text-center font-bold">
                        <div className="shadow-sm">
                            <h3>Codes Posted</h3>
                            { dashboardInfo.codes &&
                                <h1 className="text-[40px]">{dashboardInfo.codes}</h1>
                            }
                            {
                                !dashboardInfo.codes &&
                               <div className={"flex items-center justify-center"}>
                                   <Rings height={80} width={80}  />
                               </div>
                            }
                        </div>
                    </div>

                    <div className="w-full mt-5 flex items-center justify-center">
                        <div className="w-11/12 bg-white sm:p-5 py-5">
                            <div>
                                <h4 className="text-[25px]">Skill path</h4>

                                <div className="font-bold mt-4 text-[16px]">
                                    Your current Level
                                </div>
                            </div>

                            <div className="flex justify-center items-center my-3 w-full tex relative h-8 font-sans text-xs font-medium rounded-full flex-start bg-gray-200">
                                <div className="flex absolute left-0 bottom-0 top-0  items-center justify-center whitespace-nowrap w-[10%] h-full  text-white bg-gray-900 rounded-md ">
                                </div>
                                <div>10% Completed</div>
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
