
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (username,email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, {username, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Error in login';
    }
};