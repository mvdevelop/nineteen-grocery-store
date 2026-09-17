import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface RequireAuthProps {
  children: React.JSX.Element;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
