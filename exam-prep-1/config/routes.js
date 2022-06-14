const router = require('express').Router();

const userController = require('../controllers/user');
const homeController = require('../controllers/home');

router.use('/', homeController);
router.use('/users', userController);
router.all('*', (req, res) => {
    res.render('404');
});

module.exports = router;
