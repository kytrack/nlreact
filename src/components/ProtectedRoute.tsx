import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('jwtToken');
  return token ? children : <Navigate to="/home" replace />;
};

export default ProtectedRoute;