const router = require('express').Router();
const accessoryService = require('../services/accessory');

const { isUser } = require('../middlewares/guards');

router.get('/create/accessory', isUser(), (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.post('/create/accessory', isUser(), async (req, res) => {
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

module.exports = router;
