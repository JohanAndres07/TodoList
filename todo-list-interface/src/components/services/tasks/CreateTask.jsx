import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createTask = async (taskName, groupId) => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const taskData = {
        taskName: taskName, 
        dueDate: new Date().toISOString().slice(0, 10), 
        status: "pending",
        priority: "medium",
        user: userId,
        group: groupId
    };

    try {
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create task: Network error';
    }
};
