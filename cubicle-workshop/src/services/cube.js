const Cube = require('../models/Cube');

exports.getAll = async function () {
    const cubes = await Cube.find({}).populate('accessories').lean();
    return cubes;
};

exports.create = async function (data) {
    const cube = new Cube({
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        difficultyLevel: data.difficultyLevel,
    });

    await cube.save();

    return cube;
};

exports.getById = async function (id) {
    const cube = await Cube.findById(id).lean();

    return cube;
};
