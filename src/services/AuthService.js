import axios from 'axios';

const API_URL = 'http://localhost:3000/users/login'; // La URL del endpoint

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL,
            {
                email: email,
                password: password
            });
        return response.data; // Devolver la respuesta de la API
    } catch (error) {
        console.error('Error al hacer login:', error);
        throw error;
    }
};
