const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        enum: ['pendiente', 'en progreso', 'completado'],
        default: 'pendiente'
    },
    fechaLimite: {
        type: Date,
        required: true
    },
    color: {
        type: String,
        default: '#FFFFFF' // por si querés que tenga uno base
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
