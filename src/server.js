const express = require('express');
const app = express();
const limiter = require('./shared/middlewares/rateLimit');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

const loginRoutes = require('./routes/loginRoutes');
const updateRoutes = require('./routes/updateRoutes');
const projectRoutes = require('./routes/admin/projectRoutes');

app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/update', updateRoutes);
app.use('/api/v1/project', projectRoutes);

app.use((err, _, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno do servidor');
});

module.exports = app;