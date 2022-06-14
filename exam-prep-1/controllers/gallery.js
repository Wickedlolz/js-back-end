const router = require('express').Router();

const galleryService = require('../services/gallery');
const { isGuest, isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/', async (req, res) => {
    const publications = await galleryService.getAll().lean();
    res.render('gallery', { publications });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post(
    '/create',
    isUser(),
    body('title').trim(),
    body('paintingTechnique').trim(),
    body('picture').trim(),
    body('certificate').trim(),
    body('title')
        .notEmpty()
        .withMessage('Title is required!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('The Title should be a minimum of 6 characters long.'),
    body('paintingTechnique')
        .notEmpty()
        .withMessage('Painting Technique is required!')
        .bail()
        .isLength({ max: 15 })
        .withMessage(
            'The Painting technique should be a maximum of 15 characters long.'
        ),
    body('certificate')
        .notEmpty()
        .withMessage('Certificate is required!')
        .bail()
        .custom((value) => value == 'Yes' || value == 'No')
        .withMessage('Certificate must be Yes or No !'),
    body('picture')
        .notEmpty()
        .withMessage('Picture is required!')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('Invalid picture!'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            title: req.body.title,
            paintingTechnique: req.body.paintingTechnique,
            picture: req.body.picture,
            certificate: req.body.certificate,
            author: res.locals.user.id,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await galleryService.create(data);
            res.redirect('/gallery');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('create', { errors, data });
        }
    }
);

module.exports = router;