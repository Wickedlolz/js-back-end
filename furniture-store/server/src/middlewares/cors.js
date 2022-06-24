module.exports = function () {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Controll-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS, HEAD'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, X-Authorization'
        );

        next();
    };
};
