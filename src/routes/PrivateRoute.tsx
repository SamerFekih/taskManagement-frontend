import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { VerifyToken } from "../services/AuthService";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const verifyToken = async () => {
      try {
        const response = await VerifyToken();
        if (mounted && response.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    verifyToken();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
