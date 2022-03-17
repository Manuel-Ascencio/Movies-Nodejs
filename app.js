const express = require('express');

const { globalErrorHandler } = require('./controllers/error-controller');

const { actorsRouter } = require('./routers/actor-routes');

const app = express();

app.use(express.json());

app.use('/api/v1/actors', actorsRouter);

app.use(globalErrorHandler);

module.exports = { app };
