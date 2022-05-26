const uniqid = require('uniqid');

class Cube {
    constructor(name, description, imageUrl, difficultyLevel) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }
}

module.exports = Cube;
