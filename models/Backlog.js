const mongoose = require('mongoose');

const BacklogSchema = new mongoose.Schema({
    tareas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Backlog', BacklogSchema);
