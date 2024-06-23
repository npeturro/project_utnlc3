import { useState, useEffect } from 'react';
import { Get, PostRegister } from '../fetch';

const useRegister = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const get = await Get("users");
            setUsers(get);
        };

        fetchData();
    }, []);

    const authenticateRegister = async (values) => {
        const { email, user } = values;

        const existUser = users.find(u => u.email === email || u.username === user);

        if (existUser) {
            if (existUser.email === email) {
                return { error: "El email ingresado ya existe" };
            } else if (existUser.username === user) {
                return { error: "El usuario ingresado ya existe" };
            }
        }

        const result = await PostRegister(values);

        if (result === "ok") {
            return { success: "Usuario registrado con éxito" };
        } else {
            return { error: "Error al registrar el usuario" };
        }
    };

    return { authenticateRegister };

}

export default useRegister;
