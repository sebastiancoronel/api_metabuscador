const express = require('express');
const app = express();
const db = require('./database');

const jobsRouter = require('./routes/jobs');
const usersRouter = require('./routes/users');
const pieChartRouter = require('./routes/pie-chart');
const salaryRouter = require('./routes/salary');
const statsRouter = require('./routes/stats');
require('dotenv').config();
const cors = require('cors');

// /ESTUDIAR ESTO - REMOVE AFTER CHECKED OUT/
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3001' }));

app.use('/jobs',jobsRouter);
app.use('/users',usersRouter);
app.use('/pie-chart',pieChartRouter);
app.use('/salaries',salaryRouter);
app.use('/stats',statsRouter);

app.listen(3000,() => {
    console.log('Escuchando puerto 3000');
});

module.exports = app;