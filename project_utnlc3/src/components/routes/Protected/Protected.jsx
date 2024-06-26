import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user-context";

const Protected = ({ children }) => {

    const {userLoged} = useContext(UserContext);

    if ( !userLoged.authenticated ) {
        return <Navigate to="/login" replace />;
    }
    return children;
};


export default Protected;