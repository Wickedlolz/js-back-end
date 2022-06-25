const router = require('express').Router();

const usersService = require('../services/users');

router.post('/register', async (req, res) => {
    const data = {
        email: req.body.email.trim().toLocaleLowerCase(),
        password: req.body.password.trim(),
    };

    try {
        const user = await usersService.register(data.email, data.password);
        const token = await usersService.createToken(user);

        const result = {
            email: user.email,
            _id: user._id,
            accessToken: token,
        };

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const data = {
        email: req.body.email.trim().toLocaleLowerCase(),
        password: req.body.password.trim(),
    };

    try {
        const user = await usersService.login(data.email, data.password);
        const token = await usersService.createToken(user);

        const result = {
            email: user.email,
            _id: user._id,
            accessToken: token,
        };

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    usersService.logout(req.user.token);
    res.status(204).end();
});

module.exports = router;
