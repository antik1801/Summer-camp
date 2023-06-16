import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const CommonDashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <div className='text-center flex items-center justify-center'>
           { isAdmin &&  <p className='text-5xl font-extrabold text-green-500'>Welcome! To Admins DashBoard</p>}
           {
            isInstructor && <p className='text-5xl font-extrabold text-orange-500'>Welcome! To instructor DashBoard</p>
           }
           {
            ( !isAdmin && !isInstructor ) && <p className='text-5xl font-extrabold text-blue-400'>Welcome! To Students DashBoard</p>
           }

        </div>
    );
};

export default CommonDashboard;