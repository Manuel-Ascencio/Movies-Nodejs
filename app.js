const express = require('express');

const { globalErrorHandler } = require('./controllers/error-controller');

const { actorsRouter } = require('./routers/actor-routes');
const { moviesRouter } = require('./routers/movie-routes');
const { usersRouter } = require('./routers/user-routes');

const app = express();

app.use(express.json());

app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);

app.use(globalErrorHandler);

module.exports = { app };
