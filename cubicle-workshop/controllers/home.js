const router = require('express').Router();
const cubeService = require('../services/cube');

router.get('/', async (req, res) => {
    let cubes = await cubeService.getAll();

    if (req.query.search) {
        cubes = cubes.filter((c) =>
            c.name
                .toLocaleLowerCase()
                .includes(req.query.search.toLocaleLowerCase())
        );
    }

    if (req.query.from) {
        cubes = cubes.filter(
            (c) => c.difficultyLevel >= Number(req.query.from)
        );
    }

    if (req.query.to) {
        cubes = cubes.filter((c) => c.difficultyLevel <= Number(req.query.to));
    }

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
