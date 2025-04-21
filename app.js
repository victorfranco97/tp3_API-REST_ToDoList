const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
// Importar rutas
const taskRoutes = require('./routes/tasks');
const sprintRoutes = require('./routes/sprints');
const backlogRoutes = require('./routes/backlog');
const setupSwagger = require('./swagger');

setupSwagger(app);
// Usar rutas
app.use('/tasks', taskRoutes);
app.use('/sprints', sprintRoutes);
app.use('/backlog', backlogRoutes);

// Conexión a MongoDB

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`✅ Conectado a MongoDB en: ${process.env.MONGODB_URI}`);
    })
    .catch((err) => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
    });


