const HttpError = require('../models/http-error');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const getAll = async (req, res, next) => {

    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not get users!', 500));
    }

    res.status(200).json(users.map(u => u.toObject({ getters: true })));
};

const signUp = async (req, res, next) => {

    let existingUser;
    try {
        existingUser = await User.findOne({ username: req.body.username });
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    if (existingUser) {
        return next(new HttpError('Could not sign up! User already exists!', 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    let token;
    try {
        token = jwt.sign({ userId: newUser.id, email: newUser.email },
            process.env.PRIVATE_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    res.status(200).json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {

    const { username, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not login! Please try again later!', 500));
    }

    if (!existingUser) {
        return next(new HttpError('Could not login! User with username: ' + username + ' does not exist!', 401));
    }

    let isPasswordValid;
    try {
        isPasswordValid = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not login! Please try again later!', 500));
    }

    if (!isPasswordValid) {
        return next(new HttpError('Could not login. Invalid credentials.', 401));
    }

    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: existingUser.email },
            process.env.PRIVATE_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    res.status(200).json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.getAll = getAll;
exports.signUp = signUp;
exports.login = login;