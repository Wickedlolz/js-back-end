const router = require('express').Router();

const galleryService = require('../services/gallery');
const userService = require('../services/user');
const { isGuest, isUser, isCreator } = require('../middlewares/guards');
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

            const publication = await galleryService.create(data);
            await userService.addToMyPublication(
                res.locals.user.id,
                publication._id
            );
            res.redirect('/gallery');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('create', { errors, data });
        }
    }
);

router.get('/details/:id', async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publication = await galleryService
            .getById(publicationId)
            .populate('author')
            .populate('usersShared')
            .lean();

        const isAuthor = publication.author._id == res.locals.user?.id;
        const canShare = publication.usersShared.find(
            (u) => u._id == res.locals.user?.id
        )
            ? false
            : true;

        res.render('details', { publication, isAuthor, canShare });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { errors });
    }
});

router.get('/edit/:id', isCreator(), async (req, res) => {
    const publicationId = req.params.id;

    try {
        const publication = await galleryService.getById(publicationId).lean();

        res.render('edit', { publication });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { errors });
    }
});

router.post(
    '/edit/:id',
    isCreator(),
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
        const publicationId = req.params.id;

        const data = {
            title: req.body.title,
            paintingTechnique: req.body.paintingTechnique,
            picture: req.body.picture,
            certificate: req.body.certificate,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const publication = await galleryService.update(
                publicationId,
                data
            );
            res.redirect('/gallery/details/' + publication._id);
        } catch (error) {
            const errors = mapErrors(error);
            data._id = publicationId;
            res.render('edit', { errors, publication: data });
        }
    }
);

router.get('/delete/:id', isCreator(), async (req, res) => {
    const publicationId = req.params.id;
    await galleryService.deleteById(publicationId);

    res.redirect('/gallery');
});

router.get('/share/:id', isUser(), async (req, res) => {
    const publicationId = req.params.id;
    const userId = res.locals.user.id;

    try {
        const publication = await galleryService.share(publicationId, userId);
        await userService.addToMyShares(userId, publicationId);
        res.redirect('/gallery/details/' + publication._id);
    } catch (error) {
        const errors = [{ msg: error.message }];
        res.render('404', { errors });
    }
});

module.exports = router;
