import React, { use } from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = use(AuthContext);

  if (!loadingUser) {
    if (user) {
      return children;
    } else return <Navigate to="/login"></Navigate>;
  }
};

export default PrivateRoute;
