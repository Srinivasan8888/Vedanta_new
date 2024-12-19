import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');
  const token2 = localStorage.getItem('refreshToken');

  if(token && token2 ) {
    return <Outlet />
  }else {
    return <Navigate to={"/"}/>;
  }
}

export default ProtectedRoute;
