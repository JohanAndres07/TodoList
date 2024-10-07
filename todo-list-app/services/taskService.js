const Task = require('../modelsdb/taskEntity');

class TaskService {
    async getAllTasks(userId) {
        return await Task.find({ user: userId });
    }

    async createTask(taskData, userId) {
        const task = new Task({ ...taskData, user: userId });
        return await task.save();
    }

    async getTaskById(id, userId) {
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) throw new Error('Task not found');
        return task;
    }

    async updateTask(id, taskData, userId) {
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) throw new Error('Task not found');

        task.taskName = taskData.taskName || task.taskName;
        task.dueDate = taskData.dueDate || task.dueDate;
        task.status = taskData.status || task.status;
        task.priority = taskData.priority || task.priority;
        task.relatedPaciente = taskData.relatedPaciente || task.relatedPaciente;

        return await task.save();
    }

    async deleteTask(id, userId) {
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) throw new Error('Task not found');
        return await task.deleteOne();
    }

    async patchTask(id, taskData) {
        const task = await Task.findById(id);
        if (!task) throw new Error('Task not found');
        Object.assign(task, taskData);
        return await task.save();
    }

    async getAllTasksPaginated(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return await Task.find().skip(skip).limit(limit);
    }
}

module.exports = new TaskService();
