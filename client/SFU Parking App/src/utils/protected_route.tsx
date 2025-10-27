import { Navigate } from "react-router-dom";

// Will redirect to the given URL if the user is not logged in, else it will show the component referred to by the children variable

// @ts-ignore
export default function ProtectedRoute({ isLoggedIn, children, redirectTo = "/login" }) {
    return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
}
