const router = require('express').Router();

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.get('/attach/accessory/:id', (req, res) => {
    res.render('attachAccessory', { title: 'Attach Accessory' });
});

module.exports = router;
