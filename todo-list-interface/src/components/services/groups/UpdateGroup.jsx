import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const updateGroup = async (idGroup, groupName, tasks) => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const groupData = {
        name: groupName, 
        user: userId, 
        tasks: tasks
    };

    try {
        const response = await axios.put(`${API_URL}/groups/${idGroup}`, groupData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update group: Network error';
    }
};
