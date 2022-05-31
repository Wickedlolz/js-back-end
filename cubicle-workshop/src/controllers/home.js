const router = require('express').Router();
const cubeService = require('../services/cube');

router.get('/', async (req, res) => {
    const cubes = await cubeService.getAll(req.query);

    res.locals = {
        title: 'Browse',
        cubes,
        searchedValue: req.query.search,
        from: req.query.from,
        to: req.query.to,
    };

    res.render('index');
});

router.get('/about', (req, res) => {
    res.locals = {
        title: 'About',
    };

    res.render('about');
});

module.exports = router;
