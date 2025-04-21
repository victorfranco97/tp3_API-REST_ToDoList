const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const opciones = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ToDo API',
            version: '1.0.0',
            description: 'API para gestión de tareas, sprints y backlog',
        }
    },
    apis: ['./routes/*.js'], // Archivos donde están tus rutas documentadas
};

const swaggerSpec = swaggerJSDoc(opciones);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
