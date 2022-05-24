const Cube = require('../models/Cube');
const fs = require('fs/promises');

exports.getAll = async function () {
    const cubes = await readCubes();
    return cubes;
};

exports.create = async function (data) {
    const cubes = await readCubes();
    const cube = new Cube(
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    cubes.push(cube);

    await writeCube(cubes);
    return cube;
};

exports.getById = async function (id) {
    const cubes = await readCubes();
    const cube = cubes.find((c) => c.id == id);

    return cube;
};

async function readCubes() {
    const cubesData = await fs.readFile('./config/database.json', {
        encoding: 'utf-8',
    });

    const cubes = JSON.parse(cubesData);

    return cubes;
}

async function writeCube(data) {
    return await fs.writeFile('./config/database.json', JSON.stringify(data), {
        encoding: 'utf-8',
    });
}
