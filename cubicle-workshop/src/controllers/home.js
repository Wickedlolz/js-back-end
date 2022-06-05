const router = require('express').Router();
const cubeService = require('../services/cube');

router.get('/', async (req, res) => {
    try {
        const cubes = await cubeService.getAll(req.query);

        console.log(res.locals);

        res.render('index', {
            title: 'Browse',
            cubes,
            searchedValue: req.query.search,
            from: req.query.from,
            to: req.query.to,
        });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

module.exports = router;
