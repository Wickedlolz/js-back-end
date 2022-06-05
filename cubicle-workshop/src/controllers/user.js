const router = require('express').Router();
const userService = require('../services/user');

router.get('/register', (req, res) => {
    res.render('registerPage', { title: 'Register' });
});

router.post('/register', async (req, res) => {
    const data = {
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        repeatPassword: req.body.repeatPassword.trim(),
    };

    try {
        if (
            data.username == '' ||
            data.password == '' ||
            data.repeatPassword == ''
        ) {
            throw new Error('All fields are required!');
        }

        if (data.password !== data.repeatPassword) {
            throw new Error('Passwords not match!');
        }

        await userService.register(data);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('registerPage', { title: 'Register' });
    }
});

router.get('/login', (req, res) => {
    res.render('loginPage', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    const data = {
        username: req.body.username.trim(),
        password: req.body.password.trim(),
    };

    try {
        const token = await userService.login(data);
        res.cookie('user', token);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('loginPage', { title: 'Login' });
    }
});

module.exports = router;
