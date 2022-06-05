const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('registerPage', { title: 'Register' });
});

router.get('/login', (req, res) => {
    res.render('loginPage', { title: 'Login ' });
});

module.exports = router;
