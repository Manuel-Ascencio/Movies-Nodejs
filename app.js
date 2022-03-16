const express = require('express');

const { globalErrorHandler } = require('./controllers/error-controller');

const app = express();

app.use(globalErrorHandler);

module.exports = { app };
