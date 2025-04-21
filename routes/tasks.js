const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');

// Validaciones para crear y editar
const validaciones = [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('estado').optional().isIn(['pendiente', 'en progreso', 'completado']).withMessage('Estado inválido'),
    body('fechaLimite').notEmpty().withMessage('La fecha límite es obligatoria').isISO8601().toDate(),
    body('color').optional().isHexColor().withMessage('El color debe ser un código hexadecimal')
];

// Rutas
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validaciones, taskController.createTask);
router.put('/:id', validaciones, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
