const router = require('express').Router();

const cubeService = require('../services/cube');
const accessoryService = require('../services/accessory');

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

    try {
        const cube = await cubeService.getById(id);

        res.locals = {
            title: cube.name,
            cube,
        };

        res.render('details');
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.get('/attach/accessory/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cube = await cubeService.getById(id);
        let accessories = await accessoryService.getAllAvailable(
            cube.accessories
        );

        res.render('attachAccessory', {
            title: 'Attach Accessory',
            cube,
            accessories,
        });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.post('/attach/accessory/:id', async (req, res) => {
    const { id } = req.params;
    const accessoryId = req.body.accessory;

    try {
        await cubeService.attach(id, accessoryId);
        await accessoryService.attach(accessoryId, id);

        res.redirect('/details/' + id);
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.get('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeService.getById(cubeId);

    res.render('editCubePage', { title: `Edit - ${cube.name}`, cube });
});

module.exports = router;
