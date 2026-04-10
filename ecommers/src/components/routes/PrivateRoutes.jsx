import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/ContextUser";

export default function AdminRoute({ children }) {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) return null;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (currentUser.rol !== "admin") return <Navigate to="/" replace />;

  return children;
}
