const Housing = require('../models/Housing');

exports.create = async function (houseData) {
    const house = new Housing(houseData);

    await house.save();

    return house;
};

exports.getById = function (houseId) {
    return Housing.findById(houseId);
};
