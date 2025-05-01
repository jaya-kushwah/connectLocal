import React from 'react';
import { Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    const cookies = new Cookies();
    const user = cookies.get('user'); // or cookies.get('token') if stored separately

    if (!user.token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
