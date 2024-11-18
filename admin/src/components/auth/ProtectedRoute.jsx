import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get('authToken');

  const isTokenExpired = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  };

  if (!token || isTokenExpired(token)) {
    cookies.remove('authToken');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
