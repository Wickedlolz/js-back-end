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
