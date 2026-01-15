import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX, ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
