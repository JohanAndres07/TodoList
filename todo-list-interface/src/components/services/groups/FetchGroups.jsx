import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchGroups = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        throw new Error('No userId or token found in localStorage.');
    }

    try {
        const response = await axios.get(`${API_URL}/groups/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }, userId,
        });
        
        return response.data || []; 
    } catch (error) {
        console.error('Error details:', error);
        throw error.response?.data?.message || 'Failed to fetch groups: Network error';
    }
};
