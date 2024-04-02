import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const ProtectedRoute = ({ redirectTo = '/home', children, user }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Usuario anónimo, redirige al login
    return <Navigate to="/login" replace />;
  }

  let userRole = '';
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken?.rol;
  } catch (error) {
    console.error('Error decoding token:', error);
    // Manejar el error de decodificación del token aquí si es necesario
  }

  if (userRole !== user) {
    // Usuario con token pero rol incorrecto, redirige según su rol
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
