const router = require('express').Router();
const accessoryService = require('../services/accessory');

const { isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/create/accessory', isUser(), (req, res) => {
    res.render('createAccessory', { title: 'Create Accessory' });
});

router.post(
    '/create/accessory',
    isUser(),
    body('name').trim(),
    body('description').trim(),
    body('imageUrl').trim(),
    body('name')
        .notEmpty()
        .withMessage('Accessory Name is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Accessory Name must be atleast 5 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Accessory Name who could be English letters, digits, and whitespace.'
        ),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 20 })
        .withMessage('Description must be atleast 20 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Description could be English letters, digits, and whitespace'
        ),
    body('imageUrl')
        .notEmpty()
        .withMessage('Image URL is required!')
        .bail()
        .custom(
            (value) => value.startsWith('http') || value.startsWith('https')
        )
        .withMessage(
            'Referring to actual picture (starts with http://... or https://...)'
        ),
    async (req, res) => {
        const { errors } = validationResult(req);
        const data = {
            name: req.body.name.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            await accessoryService.create(data);

            res.redirect('/');
        } catch (error) {
            const errors = mapErrors(error);
            res.render('createAccessory', {
                title: 'Create Accessory',
                errors,
                data,
            });
        }
    }
);

module.exports = router;
