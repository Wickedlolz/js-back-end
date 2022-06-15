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
    body('adress').trim(),
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
        .withMessage('The repeat password should be equal to the password.'),
    body('adress')
        .notEmpty()
        .withMessage('Adress is required!')
        .isLength({ max: 20 })
        .withMessage('The address should be a maximum of 20 characters long'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            username: req.body.username,
            password: req.body.password,
            adress: req.body.adress,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const user = await userService.register(
                data.username,
                data.password,
                data.adress
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
    res.render('login');
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

            const user = await userService.login(data.username, data.password);
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

router.get('/profile/:id', isUser(), async (req, res) => {
    const userId = req.params.id;
    const user = await userService
        .getById(userId)
        .populate('myPublication')
        .lean();

    user.myPublicationTitles = user.myPublication
        .map((p) => p.title)
        .join(', ');

    // TODO: viktor: show current user shared publicaiton title separated with ", "
    res.render('profile', { user });
});

module.exports = router;
