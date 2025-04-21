const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const sprintController = require('../controllers/sprintController');

const validacionesSprint = [
    body('fechaInicio').notEmpty().withMessage('La fecha de inicio es obligatoria').isISO8601().toDate(),
    body('fechaCierre').notEmpty().withMessage('La fecha de cierre es obligatoria').isISO8601().toDate(),
    body('color').optional().isHexColor().withMessage('Color inválido')
];

// Rutas principales
router.get('/', sprintController.getAllSprints);
router.get('/:id', sprintController.getSprintById);
router.post('/', validacionesSprint, sprintController.createSprint);
router.put('/:id', validacionesSprint, sprintController.updateSprint);
router.delete('/:id', sprintController.deleteSprint);

// Agregar tarea al sprint
router.put('/:id/add-task/:taskId', sprintController.addTaskToSprint);

module.exports = router;
