const User = require('../models/User');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUNDS } = require('../config/config');

exports.register = async function (email, password) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken.');
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = new User({
        email,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

exports.createToken = function (user) {
    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(
            { email: user.email, _id: user._id },
            JWT_SECRET,
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
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}
