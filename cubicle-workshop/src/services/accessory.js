const Accessory = require('../models/Accessory');

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
