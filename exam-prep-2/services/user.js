const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const { config } = require('../config/config');

exports.register = async function (name, username, password) {
    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, config.SALT_ROUNDS);
    const user = new User({ name, username, password: hashedPassword });

    await user.save();

    return user;
};

exports.login = async function (username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error("User doesn't exist");
    }

    const isIdentical = await compare(password, user.password);

    if (!isIdentical) {
        throw new Error('Incorect Password');
    }

    return user;
};

exports.createToken = function (user) {
    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(
            { username: user.username, id: user._id, adress: user.adress },
            config.JWT_SECRET,
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

async function getUserByUsername(username) {
    const user = await User.findOne({
        username: new RegExp(`^${username}$`, 'i'),
    });
    return user;
}
