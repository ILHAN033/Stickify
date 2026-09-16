import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isActive = true;

    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/user/me",
          { withCredentials: true }
        );

        if (!isActive) return;

        setIsAuthenticated(Boolean(data?.user));
        setIsChecking(false);
      } catch {
        if (!isActive) return;

        setIsAuthenticated(false);
        setIsChecking(false);
      }
    };

    checkAuth();

    const intervalId = setInterval(() => {
      checkAuth();
    }, 2000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, []);

  if (isChecking) {
    return <div>Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
