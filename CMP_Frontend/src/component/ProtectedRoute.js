import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const roleId = localStorage.getItem("roleId");

  if (!roleId) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(parseInt(roleId))) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};
