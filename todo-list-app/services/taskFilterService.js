class TaskFilterService {
    async getFilteredTasks(filters) {
        const query = {};
        if (filters.dueDate) query.dueDate = { $gte: new Date(filters.dueDate) };
        if (filters.priority) query.priority = filters.priority;

        return await Task.find(query);
    }
}

module.exports = new TaskFilterService();
