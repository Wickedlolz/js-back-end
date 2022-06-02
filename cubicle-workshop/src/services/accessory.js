const Accessory = require('../models/Accessory');

exports.getAll = async function () {
    const accessories = await Accessory.find({}).populate('cubes').lean();
    return accessories;
};

exports.getAllAvailable = async function (ids) {
    const accessories = await Accessory.find({ _id: { $nin: ids } }).lean();
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
