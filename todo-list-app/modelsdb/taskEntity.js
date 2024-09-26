const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    relatedPaciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' }
});

module.exports = mongoose.model('Task', TaskSchema);
