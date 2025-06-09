// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
}
