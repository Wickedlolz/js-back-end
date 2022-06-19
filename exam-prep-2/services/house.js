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

exports.delete = async function (houseId) {
    await Housing.findByIdAndDelete(houseId);
};

exports.rent = async function (houseId, userId) {
    const house = await Housing.findById(houseId);

    if (house.availablePieces - 1 >= 0) {
        house.rentedHome.push(userId);
        house.availablePieces = house.availablePieces - 1;

        await house.save();

        return house;
    }
};
