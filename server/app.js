const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/user-routes.js');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    next();
});

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    throw new Error('Could not found this route.');
});

app.listen(8000);