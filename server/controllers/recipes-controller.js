const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Recipe = require('../models/recipe');

const getAll = async (req, res, next) => {

    const findParams = prepareFindParams(req.query);

    let recipes;
    try {
        recipes = await Recipe.find(findParams);
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not get recipies!', 500));
    }

    res.status(200).json(recipes.map(r => r.toObject({ getters: true })));
};

const getById = async (req, res, next) => {

    const recipeId = req.params.recipeId;

    let recipe;

    try {
        recipe = await Recipe.findById(recipeId);
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not get recipe!', 500));
    }

    if (!recipe) {
        return next(new HttpError('Could not find recipe with id: ' + recipeId, 404));
    }

    res.status(200).json(recipe.toObject({ getters: true }));

};

const getByAuthorId = async (req, res, next) => {

    const authorId = req.params.userId;

    let recipes;

    try {
        recipes = await Recipe.find({ authorId: authorId });
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not get recipies!', 500));
    }

    if (!recipes || recipes.length === 0) {
        return next(new HttpError('Could not find any recipes for user with id: ' + authorId, 404));
    }

    res.status(200).json(recipes.map(r => r.toObject({ getters: true })));

};

const create = async (req, res, next) => {

    const authorId = req.body.authorId;

    let author;
    try {
        author = await User.findById(authorId);
    } catch (err) {
        return next(new HttpError('Something went wrong! Please try again later!', 500));
    }

    if (!author) {
        return next(new HttpError('Author with id ' + authorId + ' was not found!', 404));
    }

    const recipe = new Recipe({
        authorId,
        title: req.body.title,
        image: req.file.path,
        timeToCook: req.body.timeToCook,
        preparationTime: req.body.preparationTime,
        servingPortions: req.body.servingPortions,
        course: req.body.course,
        difficulty: req.body.difficulty,
        ingredients: JSON.parse(req.body.ingredients),
        steps: JSON.parse(req.body.steps),
        seasonal: JSON.parse(req.body.seasonal),
        category: JSON.parse(req.body.category)
    });

    try {
        console.log(recipe);
        const session = await mongoose.startSession();
        session.startTransaction();
        await recipe.save({ session: session });
        author.recipes.push(recipe);
        await author.save({ session: session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(new HttpError('Something went wrong! Could not create recipe! Please try again later!', 500));
    }

    res.status(201).json(recipe.toObject({ getters: true }));

};

const prepareFindParams = queryParams => {

    let findParams = {};

    if (queryParams.course) {
        findParams.course = queryParams.course;
    }

    if (queryParams.difficulty) {
        findParams.difficulty = queryParams.difficulty;
    }

    if (queryParams.seasonal) {
        findParams.seasonal = queryParams.seasonal;
    }

    if (queryParams.category) {
        findParams.category = queryParams.category;
    }

    return findParams;

};


exports.getAll = getAll;
exports.getById = getById;
exports.getByAuthorId = getByAuthorId;
exports.create = create;