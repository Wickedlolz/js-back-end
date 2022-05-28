const Cube = require('../models/Cube');
const fs = require('fs/promises');

exports.getAll = async function () {
    const cubes = await Cube.find({}).lean();
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
    const cubes = await readCubes();
    const cube = cubes.find((c) => c.id == id);

    return cube;
};

async function readCubes() {
    const cubesData = await fs.readFile('./src/config/database.json', {
        encoding: 'utf-8',
    });

    const cubes = JSON.parse(cubesData);

    return cubes;
}

async function writeCube(data) {
    return await fs.writeFile(
        './src/config/database.json',
        JSON.stringify(data),
        {
            encoding: 'utf-8',
        }
    );
}
