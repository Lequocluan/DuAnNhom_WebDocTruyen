import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { GET } from "../../utils/response";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false); 

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  };

  useEffect(() => {
    const validateUser = async () => {
      if (!token || isTokenExpired(token)) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await GET(`${import.meta.env.VITE_API_URL}/profile`, token);
        if (data && data.role == 1) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Lỗi khi xác thực người dùng:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateUser();
  }, [token, cookies]);

  if (isLoading) {
    return; 
  }

  if (!isAuthorized) {
    cookies.remove("authToken");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
