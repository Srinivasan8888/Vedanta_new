// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import API from "../Axios/AxiosInterceptor";

// const ProtectedRoute = ({ redirectTo = "/" }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true; // Prevent state updates if the component unmounts

//     const verifyAccessToken = async () => {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         localStorage.clear();
//         if (isMounted) {
//           setIsAuthenticated(false);
//           setLoading(false);
//         }
//         return;
//       }

//       try {
//         const response = await API.get("/auth/access-token");

//         if (response.data.success) {
//           localStorage.setItem("accessToken", response.data.accessToken);
//           if (isMounted) {
//             setIsAuthenticated(true);
//           }
//         } else {
//           if (isMounted) {
//             setIsAuthenticated(false);
//           }
//         }
//       } catch (error) {
//         console.error("Token verification failed:", error);
//         localStorage.clear();
//         if (isMounted) {
//           setIsAuthenticated(false);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     verifyAccessToken();

//     return () => {
//       isMounted = false; // Cleanup function
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-white bg-gray-800">
//         <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
//       </div>
//     );
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
// };

// export default ProtectedRoute;

// export default ProtectedRoute;
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