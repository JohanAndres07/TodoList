const TaskService = require('../services/taskService');
const TaskFilterService = require('../services/taskFilterService');

class TaskController {

    async getFilteredTasks(req, res) {
        try {
            const filters = {
                dueDate: req.query.dueDate,
                priority: req.query.priority,
            };
            const tasks = await TaskFilterService.getFilteredTasks(filters);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks(req.userId);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getAllTasksForAdmin(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await TaskService.getTaskById(req.params.id, req.userId);
            res.json(task);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async createTask(req, res) {
        try {
            const taskData = req.body;
            taskData.user = req.user.id; 
            const newTask = await TaskService.createTask(taskData, req.userId);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateTask(req, res) {
        try {
            const updatedTask = await TaskService.updateTask(req.params.id, req.body, req.userId);
            res.json(updatedTask);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async deleteTask(req, res) {
        try {
            await TaskService.deleteTask(req.params.id, req.userId);
            res.json({ message: 'Task deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async patchTask(req, res) {
        try {
            const updatedTask = await TaskService.patchTask(req.params.id, req.body);
            res.json(updatedTask);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAllTasksPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const tasks = await TaskService.getAllTasksPaginated(page, limit);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    async getTaskForIdGroup(req, res) {
        try {
            const { groupId } = req.params;
            const tasks = await TaskService.getTasksByGroupId(groupId, req.userId);
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new TaskController();
