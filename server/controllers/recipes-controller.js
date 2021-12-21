const mongoose = require('mongoose');
const fs = require('fs');

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
        image: req.file ? req.file.path : undefined,
        timeToCook: req.body.timeToCook,
        preparationTime: req.body.preparationTime,
        servingPortions: req.body.servingPortions,
        course: req.body.course,
        difficulty: req.body.difficulty,
        ingredients: JSON.parse(req.body.ingredients),
        steps: JSON.parse(req.body.steps),
        seasonal: req.body.seasonal ? JSON.parse(req.body.seasonal) : undefined,
        category: req.body.category ? JSON.parse(req.body.category) : undefined,
        likedBy: [],
        cookedBy: []
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

const deleteRecipe = async (req, res, next) => {

    const recipeId = req.params.recipeId;

    let recipe;

    try {
        recipe = await Recipe.findById(recipeId).populate('authorId');
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not delete recipe.', 500));
    }

    if (!recipe) {
        return next(new HttpError('Could not find recipe.', 404));
    }

    const imagePath = recipe.image;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await recipe.remove({ session: session });

        recipe.authorId.recipes.pull(recipe);
        await recipe.authorId.save({ session: session });

        await session.commitTransaction();
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not delete recipe: ' + err.message, 500));
    }

    if (imagePath) {
        fs.unlink(imagePath, err => {
            if (err) {
                console.log('Could not remove image for recipe: ' + err);
            } else {
                console.log('Successfully removed image for recipe: ' + err);
            }
        });
    }

    res.status(200).json({ message: 'Successfully deleted recipe.' });

};

const updateRecipe = async (req, res, next) => {

    const recipeId = req.params.recipeId;

    let recipe;
    try {
        recipe = await Recipe.findById(recipeId);
    } catch (err) {
        return next(new HttpError('Something went wrong! Please try again later!', 500));
    }

    if (!recipe) {
        return next(new HttpError('Recipe with id ' + recipeId + ' was not found!', 404));
    }

    const {
        title,
        timeToCook,
        preparationTime,
        servingPortions,
        course,
        difficulty
    } = req.body;

    const ingredients = JSON.parse(req.body.ingredients);
    const steps = JSON.parse(req.body.steps);
    const seasonal = req.body.seasonal ? JSON.parse(req.body.seasonal) : undefined;
    const category = req.body.category ? JSON.parse(req.body.category) : undefined;

    recipe.title = title;
    recipe.timeToCook = timeToCook;
    recipe.preparationTime = preparationTime;
    recipe.servingPortions = servingPortions;
    recipe.course = course;
    recipe.difficulty = difficulty;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.seasonal = seasonal;
    recipe.category = category;

    if (req.file) {
        recipe.image = req.file.path;
    } else {
        recipe.image = undefined;
    }

    try {
        console.log(recipe);
        await recipe.save();
    } catch (err) {
        console.log(err);
        return next(new HttpError('Something went wrong! Could not create recipe! Please try again later!', 500));
    }

    res.status(200).json(recipe.toObject({ getters: true }));

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

    if (queryParams.title) {
        findParams.title = { $regex: queryParams.title, $options: 'i' };
    }

    return findParams;

};


exports.getAll = getAll;
exports.getById = getById;
exports.getByAuthorId = getByAuthorId;
exports.create = create;
exports.deleteRecipe = deleteRecipe;
exports.updateRecipe = updateRecipe;