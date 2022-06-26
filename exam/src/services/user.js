const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const { config } = require('../config/config');

exports.register = async function (username, email, password) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await hash(password, config.SALT_ROUNDS);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();

    return user;
};

exports.login = async function (email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorect email or password');
    }

    const isIdentical = await compare(password, user.password);

    if (!isIdentical) {
        throw new Error('Incorect email or password');
    }

    return user;
};

exports.createToken = function (user) {
    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(
            { username: user.username, email: user.email, id: user._id },
            config.JWT_SECRET,
            { expiresIn: '2d' },
            (error, token) => {
                if (error) {
                    return reject(error);
                }

                resolve(token);
            }
        );
    });

    return tokenPromise;
};

async function getUserByEmail(email) {
    const user = await User.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });
    return user;
}
