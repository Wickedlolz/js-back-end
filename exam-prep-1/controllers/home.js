const router = require('express').Router();

const galleryService = require('../services/gallery');

router.get('/', async (req, res) => {
    const publications = await galleryService
        .getAll()
        .populate('usersShared')
        .lean();

    publications.map((p) => (p.shareCount = p.usersShared.length));

    res.render('home', { publications });
});

module.exports = router;
