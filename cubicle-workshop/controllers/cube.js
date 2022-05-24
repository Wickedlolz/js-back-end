const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    res.send('POST create');
});

router.get('/details/:id', (req, res) => {
    res.render('details');
});

router.post('/details/:id', (req, res) => {
    res.send('POST details');
});

module.exports = router;
