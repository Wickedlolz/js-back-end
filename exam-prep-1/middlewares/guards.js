const { getById } = require('../services/gallery');

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
        const publicationId = req.params.id;
        const publication = await getById(publicationId)
            .populate('author')
            .lean();

        if (publication.author._id == res.locals.user?.id) {
            next();
        } else {
            res.redirect('/');
        }
    };
};
