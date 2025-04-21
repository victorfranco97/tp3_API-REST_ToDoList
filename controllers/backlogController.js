const Backlog = require('../models/Backlog');
const Task = require('../models/Task');

exports.getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.findOne().populate('tareas');
        if (!backlog) return res.status(404).json({ error: 'Backlog no encontrado' });
        res.json(backlog);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el backlog' });
    }
};

exports.createBacklog = async (req, res) => {
    try {
        const existing = await Backlog.findOne();
        if (existing) {
            return res.status(400).json({ error: 'Ya existe un backlog. Solo se permite uno.' });
        }

        const backlog = new Backlog({ tareas: [] });
        await backlog.save();
        res.status(201).json(backlog);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el backlog' });
    }
};

exports.addTaskToBacklog = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

        const backlog = await Backlog.findOne();
        if (!backlog) return res.status(404).json({ error: 'Backlog no encontrado' });

        if (!backlog.tareas.includes(taskId)) {
            backlog.tareas.push(taskId);
            await backlog.save();
        }

        res.json({ mensaje: 'Tarea agregada al backlog', backlog });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al backlog' });
    }
};
