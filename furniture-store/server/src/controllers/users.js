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

module.exports = router;
