const Publication = require('../models/Publication');

exports.getAll = function () {
    return Publication.find({});
};

exports.getById = function (publicationId) {
    return Publication.findById(publicationId);
};

exports.create = async function (publicationData) {
    const publication = new Publication(publicationData);

    await publication.save();

    return publication;
};
