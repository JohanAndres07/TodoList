import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const deleteGroup = async (groupId) => {
    if (!groupId) {
        throw new Error('Group ID is required.');
    }

    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    if (!userId) {
        throw new Error('No user ID found in localStorage.');
    }

    try {
        const response = await axios.delete(`${API_URL}/groups/${groupId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { userId }  
        });
        return response.data;
    } catch (error) {
        console.error('Error details:', error); 
        if (error.response) {
            throw error.response.data?.message || 'Failed to delete group: Network error';
        } else {
            throw new Error('Network error: Unable to connect to the server.');
        }
    }
};
