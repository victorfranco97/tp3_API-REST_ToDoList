const Sprint = require('../models/Sprint');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find().populate('tareas');
        res.json(sprints);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los sprints' });
    }
};

exports.getSprintById = async (req, res) => {
    try {
        const sprint = await Sprint.findById(req.params.id).populate('tareas');
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json(sprint);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el sprint' });
    }
};

exports.createSprint = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoSprint = new Sprint(req.body);
        await nuevoSprint.save();
        res.status(201).json(nuevoSprint);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el sprint' });
    }
};

exports.updateSprint = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const sprintActualizado = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sprintActualizado) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json(sprintActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el sprint' });
    }
};

exports.deleteSprint = async (req, res) => {
    try {
        const eliminado = await Sprint.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Sprint no encontrado' });
        res.json({ mensaje: 'Sprint eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el sprint' });
    }
};

exports.addTaskToSprint = async (req, res) => {
    const { id, taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

        const sprint = await Sprint.findById(id);
        if (!sprint) return res.status(404).json({ error: 'Sprint no encontrado' });

        if (!sprint.tareas.includes(taskId)) {
            sprint.tareas.push(taskId);
            await sprint.save();
        }

        res.json({ mensaje: 'Tarea agregada al sprint', sprint });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la tarea al sprint' });
    }
};
