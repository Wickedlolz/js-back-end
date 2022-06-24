const Furniture = require('../models/Furniture');

exports.getAll = function () {
    return Furniture.find({});
};
