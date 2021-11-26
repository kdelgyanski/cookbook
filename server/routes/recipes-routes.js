const express = require('express');

const {
    getAll,
} = require('../controllers/recipes-controller');

const router = express.Router();

router.get('/', getAll);

module.exports = router;
