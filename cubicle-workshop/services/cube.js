const Cube = require('../models/Cube');
const fs = require('fs/promises');

exports.create = async function create(data) {
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

async function readCubes() {
    const cubesData = await fs.readFile('./config/database.json', {
        encoding: 'utf-8',
    });

    const cubes = JSON.parse(cubesData);

    return cubes;
}

async function writeCube(data) {
    await fs.writeFile('./config/database.json', JSON.stringify(data), {
        encoding: 'utf-8',
    });
}
