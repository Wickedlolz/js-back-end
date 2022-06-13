const router = require('express').Router();

const userService = require('../services/user');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');
const { isGuest, isUser } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    isGuest(),
    body('username').trim(),
    body('password').trim(),
    body('rePassword').trim(),
    body('username')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('Username must be atleast 4 characters long.'),
    body('password')
        .notEmpty()
        .withMessage('Passowrd is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password must be atleast 5 characters long.'),
    body('rePassword')
        .notEmpty()
        .withMessage('Re-Password is required!')
        .bail()
        .custom((value, { req }) => value == req.body.password)
        .withMessage('Passwords not match!'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username,
            password: req.body.password,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const token = await userService.register(
                data.username,
                data.password
            );

            res.cookie('user', token);
            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('register', { errors, data });
        }
    }
);

router.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    isGuest(),
    body('username').trim(),
    body('password').trim(),
    body('usernamem')
        .notEmpty()
        .withMessage('Username is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('Username must be atleast 4 characters long.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password must be atleast 5 characters long.'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username,
            password: req.body.password,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const token = await userService.login(data.username, data.password);
            res.cookie('user', token);
            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('login', { errors, data });
        }
    }
);

router.get('/logout', isUser(), (req, res) => {});

module.exports = router;
