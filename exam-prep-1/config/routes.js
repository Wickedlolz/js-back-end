const router = require('express').Router();

const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const galleryController = require('../controllers/gallery');

router.use('/', homeController);
router.use('/users', userController);
router.use('/gallery', galleryController);
router.all('*', (req, res) => {
    res.render('404');
});

module.exports = router;
