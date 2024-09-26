const Task = require('../modelsdb/taskEntity');

class TaskService {
    async getAllTasks() {
        return await Task.find();
    }

    async getTaskById(id) {
        return await Task.findById(id);
    }

    async createTask(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    async updateTask(id, taskData) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');

        task.taskName = taskData.taskName || task.taskName;
        task.dueDate = taskData.dueDate || task.dueDate;
        task.status = taskData.status || task.status;
        task.priority = taskData.priority || task.priority;
        task.relatedPaciente = taskData.relatedPaciente || task.relatedPaciente;

        return await task.save();
    }

    async deleteTask(id) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');
        return await task.deleteOne();
    }
}

module.exports = new TaskService();
