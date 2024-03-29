import PropTypes from 'prop-types'
import {lazy} from "react";
const TButton = lazy(() => import('../../components/elements/TButton.jsx'));

export default function User({ user }) {
    return (
        <div className='flex flex-col border-gray-200 border-2 mt-2 py-3 px-2 shadow w-11/12 mx-auto gap-2'>
            <div>
                <div className='flex items-center justify-center sm:justify-start rounded-full sm:rounded-none'>
                    <img src={user.profile} className="rounded-lg  w-[100px] h-auto" alt="" />
                </div>

                <div>
                    <h5 className='font-semibold uppercase'>{user.name}</h5>
                    <h5 className='italic'>{user.email}</h5>
                    <h5>{user && user.matricule}</h5>
                    <div className='flex items-center mt-2 justify-between'>
                        <TButton color='green' to="/codes/create">
                            {/* <LinkIcon className='h-4 w-4 mr-2' />   */}
                            View Profile
                        </TButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

User.propTypes  = {
    user: PropTypes.object.isRequired
}
