const GroupService = require('../services/groupService');

class GroupController {
    async getAllGroups(req, res) {
        try {
            const groups = await GroupService.getAllGroups(req.userId);
            res.json(groups);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createGroup(req, res) {
        try {
            const groupData = req.body;
            const newGroup = await GroupService.createGroup(groupData, req.userId);
            res.status(201).json(newGroup);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getGroupById(req, res) {
        try {
            const group = await GroupService.getGroupById(req.params.id, req.userId);
            res.json(group);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async updateGroup(req, res) {
        try {
            const updatedGroup = await GroupService.updateGroup(req.params.id, req.body, req.userId);
            res.json(updatedGroup);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async deleteGroup(req, res) {
        try {
            await GroupService.deleteGroup(req.params.id, req.userId);
            res.json({ message: 'Group deleted' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async getAllTasksInGroup(req, res) {
        try {
            const tasks = await GroupService.getAllTasksInGroup(req.params.id, req.userId);
            res.json(tasks);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}

module.exports = new GroupController();
