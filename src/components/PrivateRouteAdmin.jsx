import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRouteAdmin({ children }) {
    const { user } = useContext(AuthContext);

    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
}
