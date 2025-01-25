import React from "react";
import { Navigate } from "react-router-dom";

const isValidToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload && payload.exp * 1000 > Date.now(); // Token should not be expired
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token && isValidToken(token) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

