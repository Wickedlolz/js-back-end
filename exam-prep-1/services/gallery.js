const Publication = require('../models/Publication');

exports.create = async function (publicationData) {
    const publication = new Publication(publicationData);

    await publication.save();

    return publication;
};
