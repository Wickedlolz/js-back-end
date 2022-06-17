const router = require('express').Router();

const userController = require('../controllers/user');
const housingController = require('../controllers/housing');
const homeController = require('../controllers/home');

router.use('/', homeController);
router.use('/users', userController);
router.use('/houses', housingController);

module.exports = router;
