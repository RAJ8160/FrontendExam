import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
    const {user} = useAuth();
    console.log(user)
    return (
        <div>
            <h1>
                Welcome Home - {user?.userId}
            </h1>
        </div>
    );
};

export default Dashboard;