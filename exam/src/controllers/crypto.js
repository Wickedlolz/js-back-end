const router = require('express').Router();

const cryptoService = require('../services/crypto');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');
const { isGuest, isUser, isCreator } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    try {
        const cryptos = await cryptoService.getAll().lean();
        res.render('catalog', { title: 'Trades Page', cryptos });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

router.post(
    '/create',
    isUser(),
    body('name').trim(),
    body('image').trim(),
    body('price').trim(),
    body('description').trim(),
    body('payment').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Name should be at least 2 characters long.'),
    body('image')
        .notEmpty()
        .withMessage('Image is required.')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('Image should start with http:// or https://'),
    body('price')
        .notEmpty()
        .withMessage('Price is required.')
        .bail()
        .custom((value) => value >= 1)
        .withMessage('Price must be positive number.'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description should be minimum 10 characters long.'),
    async (req, res) => {
        const { errors } = validationResult(req);

        const data = {
            name: req.body.name,
            image: req.body.image,
            price: Number(req.body.price),
            description: req.body.description.trim(),
            paymentMethod: req.body.payment,
            owner: req.user.id,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await cryptoService.create(data);

            res.redirect('/trades');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('create', { title: 'Create Page', errors, data });
        }
    }
);

router.get('/details/:cryptoId', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const crypto = await cryptoService.getById(cryptoId).lean();
        const isAuthor = crypto.owner == req.user?.id;
        const canBuy = crypto.buy.find((c) => c == req.user?.id) ? false : true;
        res.render('details', { title: crypto.name, crypto, isAuthor, canBuy });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

router.get('/edit/:cryptoId', isCreator(), async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        const crypto = await cryptoService.getById(cryptoId).lean();
        crypto[`${crypto.paymentMethod}`] = true;

        res.render('edit', { title: crypto.name, crypto });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

router.post(
    '/edit/:cryptoId',
    isCreator(),
    body('name').trim(),
    body('image').trim(),
    body('price').trim(),
    body('description').trim(),
    body('payment').trim(),
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Name should be at least 2 characters long.'),
    body('image')
        .notEmpty()
        .withMessage('Image is required.')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage('Image should start with http:// or https://'),
    body('price')
        .notEmpty()
        .withMessage('Price is required.')
        .bail()
        .custom((value) => value >= 1)
        .withMessage('Price must be positive number.'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description should be minimum 10 characters long.'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const cryptoId = req.params.cryptoId;

        const data = {
            _id: cryptoId,
            name: req.body.name,
            image: req.body.image,
            price: Number(req.body.price),
            description: req.body.description.trim(),
            paymentMethod: req.body.payment,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const updatedCrypto = await cryptoService.updateById(
                cryptoId,
                data
            );
            res.redirect('/trades/details/' + updatedCrypto._id);
        } catch (error) {
            const errors = mapErrors(error);
            res.render('edit', { title: data.name, errors, crypto: data });
        }
    }
);

router.get('/delete/:cryptoId', isCreator(), async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoService.deleteById(cryptoId);
        res.redirect('/trades');
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

router.get('/buy/:cryptoId', isUser(), async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user.id;

    try {
        const crypto = await cryptoService.buy(cryptoId, userId);
        res.redirect('/trades/details/' + crypto._id);
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

router.get('/search', isUser(), async (req, res) => {
    const query = req.query;

    try {
        const cryptos = await cryptoService.getAll(query).lean();

        if (cryptos.length > 0) {
            cryptos[`${cryptos[0].paymentMethod}`] = true;
        }

        res.render('search', {
            title: 'Search Page',
            cryptos,
            searchCoin: query.searchCoin,
        });
    } catch (error) {
        const errors = mapErrors(error);
        res.render('404', { title: 'Not Found Page', errors });
    }
});

module.exports = router;
