const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const housingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availablePieces: {
        type: Number,
        required: true,
    },
    rentedHome: {
        type: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
    },
    owner: {
        type: ObjectId,
        ref: 'User',
    },
});

const Housing = model('Housing', housingSchema);

module.exports = Housing;
