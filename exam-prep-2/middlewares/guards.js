const { getById } = require('../services/house');

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
        const houseId = req.params.id;
        const house = await getById(houseId);

        if (house.owner == req.user.id) {
            next();
        } else {
            res.redirect('/');
        }
    };
};
