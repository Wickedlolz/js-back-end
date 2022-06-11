const router = require('express').Router();
const userService = require('../services/user');

const { isGuest, isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/register', isGuest(), (req, res) => {
    res.render('registerPage', { title: 'Register' });
});

router.post(
    '/register',
    isGuest(),
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isAlphanumeric()
        .withMessage(
            'Username should consist only of English letters and digits'
        )
        .bail()
        .isLength({ min: 5 })
        .withMessage('Username should be at least 5 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isAlphanumeric()
        .withMessage(
            'Password should consist only of English letters and digits.'
        )
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long'),
    body('repeatPassword')
        .notEmpty()
        .withMessage('Re-Password is required!')
        .bail()
        .custom((value, { req }) => value == req.body.password)
        .withMessage("Password's not match!"),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username.trim(),
            password: req.body.password.trim(),
            repeatPassword: req.body.repeatPassword.trim(),
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            if (data.password !== data.repeatPassword) {
                throw new Error('Passwords not match!');
            }

            await userService.register(data);

            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('registerPage', { title: 'Register', errors, data });
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('loginPage', { title: 'Login' });
});

router.post(
    '/login',
    isGuest(),
    body('username').trim(),
    body('password').trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isAlphanumeric()
        .withMessage(
            'Username should consist only of English letters and digits'
        )
        .bail()
        .isLength({ min: 5 })
        .withMessage('Username should be at least 5 characters long'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isAlphanumeric()
        .withMessage(
            'Password should consist only of English letters and digits'
        )
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username.trim(),
            password: req.body.password.trim(),
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const token = await userService.login(data);
            res.cookie('user', token);
            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('loginPage', { title: 'Login', errors, data });
        }
    }
);

router.get('/logout', isUser(), (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});

module.exports = router;
