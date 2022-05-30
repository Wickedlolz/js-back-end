const Accessory = require('../models/Accessory');
const cubeService = require('./cube');

exports.getAll = async function () {
    const accessories = await Accessory.find({}).lean();
    return accessories;
};

exports.create = async function (data) {
    const accessory = new Accessory({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
    });

    await accessory.save();

    return accessory;
};

exports.addCubeToAccessory = async function (accessoryId, cubeId) {
    const accessory = await Accessory.findById(accessoryId);
    accessory.cubes.push(cubeId);

    await accessory.save();
};
