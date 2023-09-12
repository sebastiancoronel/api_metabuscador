const express = require('express');
const app = express();
const db = require('./database');
const jobsRouter = require('./routes/jobs');
const usersRouter = require('./routes/users');

// /ESTUDIAR ESTO - REMOVE AFTER CHECKED OUT/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/jobs',jobsRouter);
app.use('/users',usersRouter);

app.listen(3000,() => {
    console.log('Escuchando puerto 3000');
});

module.exports = app;