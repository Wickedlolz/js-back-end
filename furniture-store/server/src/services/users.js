const User = require('../models/User');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SALT_ROUNDS } = require('../config/config');

const blacklist = new Set();

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

exports.login = async function (email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorect email or password.');
    }

    const isIdentical = await compare(password, user.password);

    if (!isIdentical) {
        throw new Error('Incorect email or password.');
    }

    return user;
};

exports.logout = function (token) {
    blacklist.add(token);
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

exports.validateToken = function (token) {
    if (blacklist.has(token)) {
        throw new Error('Token is blacklisted.');
    }

    return jwt.verify(token, JWT_SECRET, function (error, decoded) {
        if (error) {
            throw new Error(error.message);
        }

        return decoded;
    });
};

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}
