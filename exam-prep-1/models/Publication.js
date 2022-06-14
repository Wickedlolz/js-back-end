const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const publicationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    paintingTechnique: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User',
    },
    usersShared: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;
