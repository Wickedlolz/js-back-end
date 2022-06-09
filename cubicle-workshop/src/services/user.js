const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/config');

exports.register = async function (data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
        username: data.username,
        password: hashedPassword,
    });

    await user.save();
};

exports.login = async function (data) {
    const user = await User.findOne({ username: data.username });

    if (!user) {
        throw new Error('Invalid username');
    }

    const isIdentical = await bcrypt.compare(data.password, user.password);

    if (!isIdentical) {
        throw new Error('Invalid password');
    }

    const token = new Promise((resolve, reject) => {
        jwt.sign(
            { username: user.username, id: user._id },
            JWT_SECRET,
            (err, token) => {
                if (err) {
                    return reject(err);
                }

                resolve(token);
            }
        );
    });

    return token;
};
