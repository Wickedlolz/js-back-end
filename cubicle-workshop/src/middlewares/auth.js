const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = function () {
    return (req, res, next) => {
        const token = req.cookies['user'];

        if (token) {
            jwt.verify(token, JWT_SECRET, function (err, decoded) {
                if (err) {
                    res.clearCookie('user');
                } else {
                    req.user = decoded;
                    res.locals.user = decoded;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    };
};
