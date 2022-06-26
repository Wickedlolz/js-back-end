const router = require('express').Router();

const userController = require('../controllers/user');
const cryptoController = require('../controllers/crypto');

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});
router.use('/users', userController);
router.use('/trades', cryptoController);
router.all('*', (req, res) => {
    res.render('404', { title: 'Not Found Page' });
});

module.exports = router;
