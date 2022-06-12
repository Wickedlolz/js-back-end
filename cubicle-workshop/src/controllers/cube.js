const router = require('express').Router();

const cubeService = require('../services/cube');
const accessoryService = require('../services/accessory');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

const { isUser, isCreator } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Cube' });
});

router.post(
    '/create',
    isUser(),
    body('name').trim(),
    body('description').trim(),
    body('imageUrl').trim(),
    body('name')
        .notEmpty()
        .withMessage('Cube Name is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Cube name must be atleast 5 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Cube name could be English letters, digits, and whitespaces.'
        ),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 20 })
        .withMessage('Description must be atlease 20 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Description could be English letters, digits, and whitespaces.'
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
            difficultyLevel: req.body.difficultyLevel,
            creatorId: res.locals.user.id,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const cube = await cubeService.create(data);
            res.redirect('/details/' + cube._id);
        } catch (error) {
            const errors = mapErrors(error);
            res.render('create', { title: 'Create Cube', errors, data });
        }
    }
);

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const cube = await cubeService.getById(id);
        const isAuthor = cube.creatorId == res.locals.user?.id;

        res.render('details', { title: cube.name, cube, isAuthor: isAuthor });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.get('/attach/accessory/:id', isUser(), isCreator(), async (req, res) => {
    const { id } = req.params;

    try {
        const cube = await cubeService.getById(id);
        let accessories = await accessoryService.getAllAvailable(
            cube.accessories
        );

        res.render('attachAccessory', {
            title: 'Attach Accessory',
            cube,
            accessories,
        });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.post(
    '/attach/accessory/:id',
    isUser(),
    isCreator(),
    async (req, res) => {
        const { id } = req.params;
        const accessoryId = req.body.accessory;

        try {
            await cubeService.attach(id, accessoryId);
            await accessoryService.attach(accessoryId, id);

            res.redirect('/details/' + id);
        } catch (error) {
            console.error(error);
            res.render('404');
        }
    }
);

router.get('/edit/:id', isUser(), isCreator(), async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeService.getById(cubeId);
    cube[`select${cube.difficultyLevel}`] = true;

    res.render('editCubePage', { title: `Edit - ${cube.name}`, cube });
});

router.post(
    '/edit/:id',
    isUser(),
    isCreator(),
    body('name').trim(),
    body('description').trim(),
    body('imageUrl').trim(),
    body('name')
        .notEmpty()
        .withMessage('Cube Name is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Cube name must be atleast 5 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Cube name could be English letters, digits, and whitespaces.'
        ),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 20 })
        .withMessage('Description must be atlease 20 characters long.')
        .bail()
        .isAlphanumeric('en-US', { ignore: ' ' })
        .withMessage(
            'Description could be English letters, digits, and whitespaces.'
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
        const cubeId = req.params.id;

        const data = {
            name: req.body.name.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            difficultyLevel: req.body.difficultyLevel,
        };

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const cube = await cubeService.update(cubeId, data);
            res.redirect('/details/' + cube._id);
        } catch (error) {
            const errors = mapErrors(error);
            res.render('editCubePage', { errors, cube: data });
        }
    }
);

router.get('/delete/:id', isUser(), isCreator(), async (req, res) => {
    const cubeId = req.params.id;

    try {
        const cube = await cubeService.getById(cubeId);
        cube[`select${cube.difficultyLevel}`] = true;

        res.render('deleteCubePage', { title: `Delete ${cube.name}`, cube });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

router.post('/delete/:id', isUser(), isCreator(), async (req, res) => {
    const cubeId = req.params.id;

    try {
        await cubeService.delete(cubeId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('404');
    }
});

module.exports = router;
