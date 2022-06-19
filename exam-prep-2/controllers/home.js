const router = require('express').Router();

const houseService = require('../services/house');
const { isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const topHouses = await houseService
        .getAll()
        .sort({ _id: 'descending' })
        .lean();
    res.render('home', { topHouses });
});

router.get('/search', isUser(), (req, res) => {
    res.render('search');
});

module.exports = router;
