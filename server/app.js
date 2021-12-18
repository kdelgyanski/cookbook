const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const usersRoutes = require('./routes/user-routes.js');
const recipesRoutes = require('./routes/recipes-routes.js');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
});

app.use('/api/users', usersRoutes);

app.use('/api/recipes', recipesRoutes);

app.use((req, res, next) => {
    throw new Error('Could not found this route.');
});

app.use((error, req, res, next) => {
    res.status(error.code || 500).json({ message: error.message || 'General error' });
});

mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kehtm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => app.listen(8000))
    .catch(err => console.log(err));