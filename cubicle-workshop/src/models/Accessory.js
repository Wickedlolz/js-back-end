const { Schema, model, Types } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.startsWith('http') || value.startsWith('https');
            },
            message: 'Not valid image url',
        },
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
    },
    cubes: {
        type: [Types.ObjectId],
        ref: 'Cube',
    },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
