const router = require('express').Router();
const cubeService = require('../services/cube');

router.get('/', async (req, res) => {
    const cubes = await cubeService.getAll();

    res.locals = {
        title: 'Browse',
        cubes,
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
