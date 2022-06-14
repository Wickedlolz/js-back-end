const Publication = require('../models/Publication');

exports.getAll = function () {
    return Publication.find({});
};

exports.create = async function (publicationData) {
    const publication = new Publication(publicationData);

    await publication.save();

    return publication;
};
