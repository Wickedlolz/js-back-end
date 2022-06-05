exports.isUser = function () {
    return (req, res, next) => {
        if (req.cookies.user) {
            next();
        } else {
            res.redirect('/');
        }
    };
};

exports.isGuest = function () {
    return (req, res, next) => {
        if (req.cookies.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};
