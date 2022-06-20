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

router.get('/search', isUser(), async (req, res) => {
    const { search } = req.query;
    if (search != undefined) {
        const houses = await houseService.search(search).lean();
        res.render('search', { houses, search });
    } else {
        res.render('search', { search });
    }
});

module.exports = router;
