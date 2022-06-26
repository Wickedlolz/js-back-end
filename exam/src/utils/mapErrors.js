exports.mapErrors = function (error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'ValidationError') {
        return Object.values(error.errors).map((e) => ({ msg: e.message }));
    } else if (typeof error.message == 'string') {
        return [{ msg: error.message }];
    } else {
        return [{ msg: 'Request error.' }];
    }
};
