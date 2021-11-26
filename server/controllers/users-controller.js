const { v4: uuid } = require('uuid');

const HttpError = require('../models/HttpError');

const USERS = [
    {
        id: 1,
        username: 'cookie',
        email: 'cookie@test.com',
        password: 'c00ki3',
    },
    {
        id: 2,
        username: 'master_chef',
        email: 'master@test.com',
        password: 'm@ster',
    },
    {
        id: 3,
        username: 'homemadeMarmalade',
        email: 'marmalade@test.com',
        password: 'marmalade123',
    }
]

const getAll = (req, res, next) => {
    res.status(200).json(USERS);
};

const signUp = (req, res, next) => {
    const newUser = {
        id: uuid(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    if (USERS.find(u => u.email === newUser.email || u.username === newUser.username)) {
        return next(new HttpError('Could not sign up. User with this username or email already exists.', 422));
    } else {
        USERS.push(newUser);
    }

    res.status(200).json({ message: 'Successfully signed up with user: ' + newUser.username })
};

const login = (req, res, next) => {

    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username);

    if (!user || user.password !== password) {
        return next(new HttpError('Could not login. Invalid credentials.', 401));
    }

    res.status(200).json({ message: 'Successfully logged in with user: ' + username });
};

exports.getAll = getAll;
exports.signUp = signUp;
exports.login = login;