const router = require('express').Router();

const cubeService = require('../services/cube');

router.get('/create', (req, res) => {
    res.locals = {
        title: 'Create',
    };

    res.render('create');
});

router.post('/create', async (req, res) => {
    const data = {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        difficultyLevel: req.body.difficultyLevel,
    };

    try {
        const cube = await cubeService.create(data);
        res.redirect('/');
    } catch (error) {
        Object.values(error.errors).forEach((e) => console.log(e.message));
    }
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeService.getById(id);

    if (cube == undefined) {
        res.render('404');
    } else {
        res.locals = {
            title: cube.name,
            cube,
        };

        res.render('details');
    }
});

router.post('/details/:id', (req, res) => {
    res.send('POST details');
});

module.exports = router;
