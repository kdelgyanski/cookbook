const express = require('express');

const auth = require('../middleware/auth');
const imageUpload = require('../middleware/image-upload');

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

router.use(auth);

router.post('/', imageUpload.single('image'), create);

module.exports = router;
