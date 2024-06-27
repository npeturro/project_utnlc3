import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user-context";

const ProtectedSup = ({ children }) => {

    const {userLoged} = useContext(UserContext);

    if (!(userLoged.authenticated && userLoged.role === "SuperAdmin")) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


export default ProtectedSup;