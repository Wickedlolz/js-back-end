const Furniture = require('../models/Furniture');

exports.getAll = function (query) {
    const options = {};

    if (query) {
        const userId = query.split('=')[1].slice(1, -1);
        options['_ownerId'] = userId;
    }

    return Furniture.find(options);
};

exports.getById = function (furnitureId) {
    return Furniture.findById(furnitureId);
};

exports.create = async function (furnitureData) {
    const furniture = new Furniture({
        make: furnitureData.make,
        model: furnitureData.model,
        year: furnitureData.year,
        description: furnitureData.description,
        price: furnitureData.price,
        img: furnitureData.img,
        material: furnitureData.material,
        _ownerId: furnitureData._ownerId,
    });

    await furniture.save();

    return furniture;
};

exports.updateById = async function (furnitureId, furnitureData) {
    const furniture = await Furniture.findById(furnitureId);

    furniture.make = furnitureData.make;
    furniture.model = furnitureData.model;
    furniture.year = furnitureData.year;
    furniture.description = furnitureData.description;
    furniture.price = furnitureData.price;
    furniture.img = furnitureData.img;
    furniture.material = furnitureData.material;

    await furniture.save();

    return furniture;
};

exports.deleteById = async function (furnitureId) {
    const deletedItem = await Furniture.findByIdAndRemove(furnitureId);
    return deletedItem;
};
