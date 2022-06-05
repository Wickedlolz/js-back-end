const router = require('express').Router();

const cubeService = require('../services/cube');
const accessoryService = require('../services/accessory');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post('/create', async (req, res) => {
    const data = {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        difficultyLevel: req.body.difficultyLevel,
        creatorId: res.locals.user.id,
    };

    try {
        const cube = await cubeService.create(data);
        res.redirect('/details/' + cube._id);
    } catch (error) {
        Object.values(error.errors).forEach((e) => console.log(e.message));
    }
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const cube = await cubeService.getById(id);
        const isAuthor = cube.creatorId == res.locals.user.id;
        console.log(isAuthor);

        res.render('details', { title: cube.name, cube, isAuthor: isAuthor });
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
    cube[`select${cube.difficultyLevel}`] = true;

    res.render('editCubePage', { title: `Edit - ${cube.name}`, cube });
});

router.post('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;

    const data = {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        difficultyLevel: req.body.difficultyLevel,
    };

    try {
        const cube = await cubeService.update(cubeId, data);
        res.redirect('/details/' + cube._id);
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

module.exports = router;
