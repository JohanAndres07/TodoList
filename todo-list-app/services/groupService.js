const Group = require('../modelsdb/groupEntity');
const Task = require('../modelsdb/taskEntity');
const mongoose = require('mongoose');

class GroupService {
    async getAllGroups(userId) {
        return await Group.find({ user: userId }).populate('tasks');
    }

    async createGroup(groupData, userId) {
        const group = new Group({ ...groupData, user: userId });
        return await group.save();
    }

    async getGroupById(id, userId) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid group ID');
        }
        const group = await Group.findOne({ _id: id, user: userId }).populate('tasks');
        if (!group) throw new Error('Group not found');
        return group;
    }

    async updateGroup(id, groupData, userId) {
        const group = await Group.findOne({ _id: id, user: userId });
        if (!group) throw new Error('Group not found');

        group.name = groupData.name || group.name;
        return await group.save();
    }

    async deleteGroup(id, userId) {
        const group = await Group.findOne({ _id: id, user: userId });
        if (!group) throw new Error('Group not found');
        await group.deleteOne();
        return { message: 'Group deleted successfully' };
    }

    async getAllTasksInGroup(groupId, userId) {
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            throw new Error('Invalid group ID');
        }
        const group = await Group.findOne({ _id: groupId, user: userId }).populate('tasks');
        if (!group) throw new Error('Group not found');
        return group.tasks;
    }
}

module.exports = new GroupService();
