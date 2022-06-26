const router = require('express').Router();

const userService = require('../services/user');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post(
    '/register',
    isGuest(),
    body('username').trim(),
    body('email').trim(),
    body('password').trim(),
    body('rePassword').trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Username must be atleast 5 characters long.'),
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Email must be at least 10 characters long.'),
    body('password')
        .notEmpty()
        .withMessage('Passowrd is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('Password must be atleast 4 characters long.'),
    body('rePassword')
        .notEmpty()
        .withMessage('Confirm Password is required!')
        .bail()
        .custom((value, { req }) => value == req.body.password)
        .withMessage('The repeat password should be equal to the password.'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const user = await userService.register(
                data.username,
                data.email,
                data.password
            );

            const token = await userService.createToken(user);

            res.cookie('user', token);
            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('register', { errors, data });
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post(
    '/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Email must be at least 10 characters long.'),
    body('password')
        .notEmpty()
        .withMessage('Passowrd is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('Password must be atleast 4 characters long.'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            email: req.body.email,
            password: req.body.password,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const user = await userService.login(data.email, data.password);
            const token = await userService.createToken(user);
            res.cookie('user', token);
            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('login', { errors, data });
        }
    }
);

router.get('/logout', isUser(), (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;
