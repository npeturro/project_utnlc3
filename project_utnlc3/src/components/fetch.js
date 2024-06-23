import * as React from 'react';
import axios from 'axios';

const baseURL = 'http://onetechapi-utn.ddns.net/api/';

export const Get = async (consulta) => {

    try {
        const response = await axios.get(`${baseURL}${consulta}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return null;
    }
}

export const PostRegister = async (values) => {
    try {
        const nuevoUsuario = { 
            username: values.user, 
            password: values.password, 
            fullName: `${values.name} ${values.lastname}`, 
            email: values.email, 
            phone: values.number,
            address: values.street, 
            role: "Cliente", 
            isActive: "Si" 
        };

        const response = await axios.post('http://onetechapi-utn.ddns.net/api/users', nuevoUsuario);

        return "ok";
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return "error";
    }
}


