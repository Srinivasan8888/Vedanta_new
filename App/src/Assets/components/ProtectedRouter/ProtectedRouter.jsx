import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API from "../Axios/AxiosInterceptor";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAccessToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        // Clear all tokens for consistency
        localStorage.clear();
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
    
      try {
        const response = await API.get("auth/verify"); // Changed to GET
        
        if (response.data.success) {
          localStorage.setItem('accessToken', response.data.accessToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.clear(); // Clear tokens on failure
        setIsAuthenticated(false);
      }finally {
        setLoading(false);
      }
    };
    verifyAccessToken();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-800 text-white">
        Loading ...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
