import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ routeId }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth?.Appforms?.includes(routeId) ? (
    <Outlet />
  ) : auth?.AccessToken ? (
    <Navigate to="/status/403" state={{ route: location }} replace />
  ) : (
    <Navigate to="/login" state={{ route: location, redirectAfterLogin: true }} replace />
  );

  //   return auth?.AccessToken ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );
};

export default RequireAuth;
