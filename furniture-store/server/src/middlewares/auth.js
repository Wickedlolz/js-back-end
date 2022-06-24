const { validateToken } = require('../services/users');

module.exports = function () {
    return (req, res, next) => {
        const token = req.headers['x-authorization'];

        if (token) {
            try {
                const payload = validateToken(token);

                req.user = {
                    email: payload.email,
                    _id: payload._id,
                    token,
                };
            } catch (error) {
                return res
                    .status(401)
                    .json({ message: 'Invalid access token. Plese sign in.' });
            }
        }

        next();
    };
};
