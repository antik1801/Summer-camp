import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Shared/Loader';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    const [isAdmin,isAdminLoading] = useAdmin()
    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;