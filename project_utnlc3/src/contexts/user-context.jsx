import React, { createContext, useState, useEffect } from 'react';
import { Get } from '../components/fetch';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userLoged, setUserLoged] = useState({
        authenticated: false,
        role: '',
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const get = await Get("users");
            setUsers(get);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('userLoged'));
        if (localUser && localUser.authenticated) {
            const isUser = users.find(u => u.email === localUser.email);
            if (isUser) {
                setUserLoged({
                    authenticated: true,
                    role: isUser.role,
                    name: isUser.username,
                    email: isUser.email
                });
            }
        }
    }, [users]);

    return (
        <UserContext.Provider value={{ userLoged, setUserLoged }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
