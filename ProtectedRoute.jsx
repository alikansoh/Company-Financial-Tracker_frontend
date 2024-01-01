import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, role }) => {
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const setUserRoleFromToken = async () => {
      try {
        const authToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(authToken);
        const userRole = decodedToken.role;
        setUserRole(userRole);
      } catch (e) {
        console.log(e);
      }
    };

    setUserRoleFromToken();
  }, []);

  console.log(userRole);

  if (!userRole) {
    // If userRole is still empty, you might want to show a loading indicator or handle it appropriately
    return null;
  }

  if (userRole !== 'admin' && userRole !== role) {
    return <Navigate to="/Forbidden" replace />;
  }
  
  return element;
  
}  

export default ProtectedRoute;
