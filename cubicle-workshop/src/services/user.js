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
