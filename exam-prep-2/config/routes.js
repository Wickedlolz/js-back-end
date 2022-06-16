const router = require('express').Router();

const userController = require('../controllers/user');
const housingController = require('../controllers/housing');

router.get('/', (req, res) => {
    res.render('home');
});

router.use('/users', userController);
router.use('/houses', housingController);

module.exports = router;
