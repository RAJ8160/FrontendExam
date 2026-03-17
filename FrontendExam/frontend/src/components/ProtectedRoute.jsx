import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

const ProtectedRoute = ({children , allowedRoles = []}) => {
    const navigate = useNavigate();
    const { isAuthenticated, user, loading } = useAuth();

    // console.log("user =", user);

    if(loading){
        return <h1>Loading .....</h1>
    }

    if(!isAuthenticated){
        navigate('/login')
    }
    // useEffect(() => {
    //     if (!loading && !isAuthenticated) {
    //         navigate('/login');
    //     }
    // }, [loading, isAuthenticated, navigate]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if(allowedRoles.length> 0 && !allowedRoles.includes(user?.role)){
       return <Navigate to="/" replace />
    }
  return children;
}

export default ProtectedRoute