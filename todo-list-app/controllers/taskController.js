const TaskService = require('../services/taskService');

class TaskController {
    async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await TaskService.getTaskById(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json(task);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createTask(req, res) {
        try {
            const taskData = req.body;
            const newTask = await TaskService.createTask(taskData);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateTask(req, res) {
        try {
            const updatedTask = await TaskService.updateTask(req.params.id, req.body);
            res.json(updatedTask);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteTask(req, res) {
        try {
            await TaskService.deleteTask(req.params.id);
            res.json({ message: 'Task deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new TaskController();
