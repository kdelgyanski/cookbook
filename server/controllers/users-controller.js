const HttpError = require('../models/http-error');
const User = require('../models/user');

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

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await newUser.save();
    } catch (err) {
        return next(new HttpError('Something went wrong! Could not sign up!', 500));
    }

    res.status(200).json({ message: 'Successfully signed up with user: ' + newUser.username })
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

    if (existingUser.password !== password) {
        return next(new HttpError('Could not login. Invalid credentials.', 401));
    }

    res.status(200).json({ message: 'Successfully logged in with user: ' + username });
};

exports.getAll = getAll;
exports.signUp = signUp;
exports.login = login;