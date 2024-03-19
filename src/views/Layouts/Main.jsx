import {useContext, useEffect} from 'react'
import { useNavigate, Outlet} from 'react-router-dom'
import { StateContext} from "../../contexts/ContextProvider.jsx";
import MainHeader from "../../components/MainHeader.jsx";

export default function Hero() {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser} = useContext(StateContext);

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, []);
    

    return (
        <div className="bg-white">
            <MainHeader />

            <Outlet />
        </div>
    )
}
