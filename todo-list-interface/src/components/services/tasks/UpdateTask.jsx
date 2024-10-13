import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const updateTask = async (idTask, taskName, dueDate, status, priority) => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId');

    if (!token) {
        throw new Error('No token found in localStorage.');
    }

    const taskData = {
        taskName: taskName, 
        dueDate: dueDate, 
        status: status,
        priority: priority
    };

    try {
        const response = await axios.put(`${API_URL}/tasks/${idTask}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update task: Network error';
    }
};
