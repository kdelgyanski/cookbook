const express = require('express');

const {
    getAll,
    getById,
    getByAuthorId,
    create
} = require('../controllers/recipes-controller');

const router = express.Router();

router.get('/', getAll);

router.get('/:recipeId', getById);

router.get('/user/:userId', getByAuthorId);

router.post('/', create);

module.exports = router;
