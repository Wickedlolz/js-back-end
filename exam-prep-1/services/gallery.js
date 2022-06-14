const Publication = require('../models/Publication');

const userService = require('./user');

exports.getAll = function () {
    return Publication.find({});
};

exports.getById = function (publicationId) {
    return Publication.findById(publicationId);
};

exports.create = async function (publicationData) {
    const publication = new Publication(publicationData);

    await publication.save();
    await userService.addToMyPublication(
        publicationData.author,
        publication._id
    );

    return publication;
};

exports.update = async function (publicationId, data) {
    const publication = await Publication.findByIdAndUpdate(
        publicationId,
        data
    );
    return publication;
};

exports.deleteById = async function (publicationId) {
    await Publication.findByIdAndDelete(publicationId);
};

exports.share = async function (publicationId, userId) {
    const publication = await Publication.findById(publicationId);
    publication.usersShared.push(userId);

    await publication.save();

    return publication;
};
