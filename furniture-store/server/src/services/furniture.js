const Furniture = require('../models/Furniture');

exports.getAll = function () {
    return Furniture.find({});
};

exports.create = async function (furnitureData) {
    console.log(furnitureData);
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
