import { Navigate, useLocation } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}
// Will redirect to the given URL if the user is not logged in, else it will show the component referred to by the children variable

// @ts-ignore
export function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {

    const location = useLocation();

    if (!isLoggedIn) {

        return <Navigate to="/login" state={{ from: location }} replace />;

    }

    return children;

}
