import { useState, useEffect } from 'react';
import { Get } from '../fetch';

const useAuthentication = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const get = await Get("users");
            setUsers(get);
        };

        fetchData();
    }, []);

    const authenticate = (email, password) => {
        const authenticatedUser = users.find(user => user.email === email && user.password === password);

        if (authenticatedUser) {
            return {
                authenticated: true,
                role: authenticatedUser.role,
                name: authenticatedUser.username,
                email: authenticatedUser.email
            };
        } else {
            return {
                authenticated: false,
                role: null,
                name: '',
                email: ''
            };
        }
    };

    return { authenticate };
}

export default useAuthentication;
