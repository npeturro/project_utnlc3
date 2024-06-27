import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user-context";

const ProtectedAdm = ({ children }) => {

    const {userLoged} = useContext(UserContext);

    if (!(userLoged.authenticated && (userLoged.role === "Admin" || userLoged.role === "SuperAdmin")) ) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


export default ProtectedAdm;