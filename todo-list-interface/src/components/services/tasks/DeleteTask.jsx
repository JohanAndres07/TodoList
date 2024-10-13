import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const deleteTask = async (idTask) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    try {
        const response = await axios.delete(`${API_URL}/tasks/${idTask}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete task: Network error';
    }
};
