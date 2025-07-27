import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;