const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.getAllTasks = async (req, res) => {
    try {
        const { estado, ordenarPorFecha } = req.query;

        const filtro = {};
        if (estado) filtro.estado = estado;

        let query = Task.find(filtro);

        if (ordenarPorFecha === 'asc') {
            query = query.sort({ fechaLimite: 1 });
        } else if (ordenarPorFecha === 'desc') {
            query = query.sort({ fechaLimite: -1 });
        }

        const tareas = await query.exec();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

exports.createTask = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevaTarea = new Task(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

exports.updateTask = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const tareaActualizada = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tareaActualizada) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        // Validar si está asignada a un sprint (lo hacemos más adelante cuando tengamos el modelo de Sprint)
        const tareaEliminada = await Task.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};
