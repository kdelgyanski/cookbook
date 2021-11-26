const express = require('express');

const {
    getAll,
    signUp,
    login
} = require('../controllers/users-controller');

const router = express.Router();

router.get('/', getAll);

router.post('/signup', signUp);

router.post('/login', login);

module.exports = router;
