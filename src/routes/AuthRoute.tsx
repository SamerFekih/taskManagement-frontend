import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { VerifyToken } from "../services/AuthService";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (sessionStorage.getItem("token") != null) {
        try {
          const response = await VerifyToken();
          // Assuming the API returns a successful response
          if (response.status === 200) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            sessionStorage.clea();
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setAuthenticated(false);
          sessionStorage.clear();
        } finally {
          setLoading(false);
        }
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default AuthRoute;
