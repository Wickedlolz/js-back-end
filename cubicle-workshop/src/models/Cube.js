const { Schema, model, Types } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.startsWith('http') || value.startsWith('https');
            },
            message: 'Not valid image url.',
        },
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: {
        type: [Types.ObjectId],
        ref: 'Accessory',
    },
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;
