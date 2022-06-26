const { getById } = require('../services/crypto');

exports.isUser = function () {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
};

exports.isGuest = function () {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};

exports.isCreator = function () {
    return async (req, res, next) => {
        try {
            const crypto = await getById(req.params.cryptoId);

            if (crypto.owner == req.user?.id) {
                next();
            } else {
                res.redirect('/users/login');
            }
        } catch (error) {
            res.render('404', { errors: [{ msg: error.message }] });
        }
    };
};
