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

    const cube = await cubeService.create(data);
    res.redirect('/');
});

router.get('/details/:id', (req, res) => {
    res.render('details');
});

router.post('/details/:id', (req, res) => {
    res.send('POST details');
});

module.exports = router;
