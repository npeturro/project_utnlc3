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
