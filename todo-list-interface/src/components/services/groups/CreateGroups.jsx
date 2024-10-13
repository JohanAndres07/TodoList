import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createGroup = async (groupName) => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const taskData = {
        name: groupName, 
        user: userId
    };

    try {
        const response = await axios.post(`${API_URL}/groups`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create task: Network error';
    }
};
