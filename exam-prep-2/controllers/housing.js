const router = require('express').Router();
const { isGuest, isUser, isCreator } = require('../middlewares/guards');
const houseService = require('../services/house');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/rent', async (req, res) => {
    const houses = await houseService.getAll().lean();
    res.render('aprt-for-recent', { houses });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post(
    '/create',
    isUser(),
    body('name').trim(),
    body('type').trim(),
    body('year').trim(),
    body('city').trim(),
    body('image').trim(),
    body('description').trim(),
    body('availablePieces').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('The Name should be at least 6 characters'),
    body('type')
        .notEmpty()
        .withMessage('Type is required!')
        .custom(
            (value) =>
                value == 'Apartment' || value == 'Villa' || value == 'House'
        )
        .withMessage('Available types is Apartment, Villa and House'),
    body('year')
        .notEmpty()
        .withMessage('Year is required!')
        .bail()
        .custom((value) => value >= 1850 && value <= 2021)
        .withMessage('The Year should be between 1850 and 2021'),
    body('city')
        .notEmpty()
        .withMessage('City is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('The City should be at least 4 characters long'),
    body('image')
        .notEmpty()
        .withMessage('Home Image is required!')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('The Home Image should starts with http:// or https://.'),
    body('description')
        .notEmpty()
        .withMessage('Property Description is required!')
        .bail()
        .isLength({ max: 60 })
        .withMessage(
            'The Property Description should be a maximum of 60 characters long.'
        ),
    body('availablePieces')
        .notEmpty()
        .withMessage('Available pieces is required!')
        .bail()
        .custom((value) => value >= 0 && value <= 10)
        .withMessage(
            'The Available Pieces should be positive number (from 0 to 10)'
        ),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            name: req.body.name,
            type: req.body.type,
            year: Number(req.body.year),
            city: req.body.city,
            image: req.body.image,
            description: req.body.description,
            availablePieces: req.body.availablePieces,
            owner: res.locals.user.id,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await houseService.create(data);
            res.redirect('/houses');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('create', { errors, data });
        }
    }
);

router.get('/details/:id', async (req, res) => {
    const houseId = req.params.id;

    try {
        const house = await houseService.getById(houseId).lean();
        const isAuthor = house.owner == req.user.id;
        res.render('details', { house, isAuthor });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { errors });
    }
});

router.get('/edit/:id', isCreator(), async (req, res) => {
    const houseId = req.params.id;
    const house = await houseService.getById(houseId).lean();

    res.render('edit', { house });
});

router.post(
    '/edit/:id',
    isCreator(),
    body('name').trim(),
    body('type').trim(),
    body('year').trim(),
    body('city').trim(),
    body('image').trim(),
    body('description').trim(),
    body('availablePieces').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('The Name should be at least 6 characters'),
    body('type')
        .notEmpty()
        .withMessage('Type is required!')
        .custom(
            (value) =>
                value == 'Apartment' || value == 'Villa' || value == 'House'
        )
        .withMessage('Available types is Apartment, Villa and House'),
    body('year')
        .notEmpty()
        .withMessage('Year is required!')
        .bail()
        .custom((value) => value >= 1850 && value <= 2021)
        .withMessage('The Year should be between 1850 and 2021'),
    body('city')
        .notEmpty()
        .withMessage('City is required!')
        .bail()
        .isLength({ min: 4 })
        .withMessage('The City should be at least 4 characters long'),
    body('image')
        .notEmpty()
        .withMessage('Home Image is required!')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('The Home Image should starts with http:// or https://.'),
    body('description')
        .notEmpty()
        .withMessage('Property Description is required!')
        .bail()
        .isLength({ max: 60 })
        .withMessage(
            'The Property Description should be a maximum of 60 characters long.'
        ),
    body('availablePieces')
        .notEmpty()
        .withMessage('Available pieces is required!')
        .bail()
        .custom((value) => value >= 0 && value <= 10)
        .withMessage(
            'The Available Pieces should be positive number (from 0 to 10)'
        ),
    async (req, res) => {
        const { errors } = validationResult(req);
        const houseId = req.params.id;

        const data = {
            _id: houseId,
            name: req.body.name,
            type: req.body.type,
            year: Number(req.body.year),
            city: req.body.city,
            image: req.body.image,
            description: req.body.description,
            availablePieces: req.body.availablePieces,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const updatedHouse = await houseService.update(houseId, data);
            res.redirect('/houses/details/' + updatedHouse._id);
        } catch (error) {
            const errors = mapErrors(error);
            res.render('edit', { errors, house: data });
        }
    }
);

router.get('/delete/:id', isCreator(), async (req, res) => {
    const houseId = req.params.id;

    try {
        await houseService.delete(houseId);
        res.redirect('/houses/rent');
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { errors });
    }
});

module.exports = router;
