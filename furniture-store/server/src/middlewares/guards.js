const { getById } = require('../services/furniture');

exports.isAuth = function () {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in' });
        }
    };
};

exports.isGuest = function () {
    return (req, res, next) => {
        if (req.user) {
            res.status(403).json({ message: 'This resorce is forbiden.' });
        } else {
            next();
        }
    };
};

exports.isCreator = function () {
    return async (req, res, next) => {
        try {
            const item = await getById(req.params.id);

            if (item._ownerId == req.user._id) {
                next();
            } else {
                res.status(403).json({
                    message: 'You cannot modify this record!',
                });
            }
        } catch (error) {
            res.status(400).json({
                message: 'Cannot get record with this ID,',
            });
        }
    };
};
