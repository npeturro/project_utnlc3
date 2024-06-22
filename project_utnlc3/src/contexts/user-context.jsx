import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userLoged, setUserLoged] = useState({
        authenticated: false,
        role: '',
        name: ''
    });

    useEffect(() => { }, [userLoged]);


    return (
        <UserContext.Provider value={{userLoged, setUserLoged}}>
            {children}
        </UserContext.Provider>
    )
}
export { UserProvider, UserContext };