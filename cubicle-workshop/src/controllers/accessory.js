const router = require('express').Router();
const accessoryService = require('../services/accessory');
const cubeService = require('../services/cube');

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.post('/create/accessory', async (req, res) => {
    const data = {
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
    };

    try {
        await accessoryService.create(data);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.get('/attach/accessory/:id', async (req, res) => {
    const { id } = req.params;
    const cube = await cubeService.getById(id);
    let accessories = await accessoryService.getAll();

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        cube,
        accessories,
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const { id } = req.params;
    const accessoryId = req.body.accessory;

    await cubeService.addAccessoryToCube(id, accessoryId);
    await accessoryService.addCubeToAccessory(accessoryId, id);

    res.redirect('/');
});

module.exports = router;
