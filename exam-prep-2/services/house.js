const Housing = require('../models/Housing');

exports.getAll = function () {
    return Housing.find({});
};

exports.create = async function (houseData) {
    const house = new Housing(houseData);

    await house.save();

    return house;
};

exports.getById = function (houseId) {
    return Housing.findById(houseId);
};

exports.update = async function (houseId, data) {
    const house = await Housing.findByIdAndUpdate(houseId, data);

    return house;
};
