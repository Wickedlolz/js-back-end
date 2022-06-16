const router = require('express').Router();

const userController = require('../controllers/user');

router.get('/', (req, res) => {
    res.render('home');
});

router.use('/users', userController);

module.exports = router;
