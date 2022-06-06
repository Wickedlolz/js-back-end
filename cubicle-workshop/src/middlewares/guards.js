const { getById } = require('../services/cube');

exports.isUser = function () {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
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
        const cube = await getById(req.params.id);

        if (req.user?.id == cube.creatorId) {
            next();
        } else {
            res.redirect('/');
        }
    };
};
