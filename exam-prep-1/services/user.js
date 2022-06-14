const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const { config } = require('../config/config');

exports.register = async function (username, password, adress) {
    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, config.SALT_ROUNDS);
    const user = new User({ username, password: hashedPassword, adress });

    await user.save();

    const token = new Promise((resolve, reject) => {
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

    return token;
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

    const token = new Promise((resolve, reject) => {
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

    return token;
};

async function getUserByUsername(username) {
    const user = await User.findOne({
        username: new RegExp(`^${username}$`, 'i'),
    });
    return user;
}
