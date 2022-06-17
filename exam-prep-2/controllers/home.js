const router = require('express').Router();

const houseService = require('../services/house');

router.get('/', async (req, res) => {
    const topHouses = await houseService
        .getAll()
        .sort({ _id: 'descending' })
        .lean();
    res.render('home', { topHouses });
});

module.exports = router;
