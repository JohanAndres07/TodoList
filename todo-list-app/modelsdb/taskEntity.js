const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in_progress','completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false },
});

module.exports = mongoose.model('Task', TaskSchema);

