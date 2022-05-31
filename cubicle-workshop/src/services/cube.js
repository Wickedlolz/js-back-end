const Cube = require('../models/Cube');

exports.getAll = async function (query) {
    const options = {};

    if (query && query.search) {
        options.name = new RegExp(query.search.toLocaleLowerCase(), 'i');
    }

    if (query && query.from) {
        options.difficultyLevel = {
            $gte: Number(query.from),
        };
    }

    if (query && query.to) {
        if (query.from) {
            options.difficultyLevel = {
                $gte: Number(query.from),
                $lte: Number(query.to),
            };
        } else {
            options.difficultyLevel = {
                $lte: Number(query.to),
            };
        }
    }

    const cubes = await Cube.find(options).populate('accessories').lean();
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
    const cube = await Cube.findById(id).populate('accessories').lean();

    return cube;
};

exports.addAccessoryToCube = async function (cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    cube.accessories.push(accessoryId);

    await cube.save();
};
