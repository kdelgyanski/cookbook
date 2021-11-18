const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    next();
});

app.use('/api/cookbook', (req, res, next) => {
    res.status(200).send({ version: '0.0.1' });
});

app.use((req, res, next) => {
    throw new Error('Could not found this route.');
});

app.listen(8000);