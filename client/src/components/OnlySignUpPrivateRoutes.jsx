import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// for preventing the unsigned user from accessing the routes
function OnlySignUpPrivateRoutes() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/sign-up"} />;
}

export default OnlySignUpPrivateRoutes;
