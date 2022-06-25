const router = require('express').Router();

const { isAuth, isCreator } = require('../middlewares/guards');
const furnitureService = require('../services/furniture');
const { mapErrors } = require('../utils/mapErrors');

router.get('/', async (req, res) => {
    try {
        const items = await furnitureService.getAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ message: 'Bad request.' });
    }
});

router.post('/', isAuth(), async (req, res) => {
    const item = {
        make: req.body.make.trim(),
        model: req.body.model.trim(),
        year: Number(req.body.year),
        description: req.body.description.trim(),
        price: Number(req.body.price),
        img: req.body.img.trim(),
        material: req.body.material.trim(),
        _ownerId: req.user._id,
    };

    try {
        const furniture = await furnitureService.create(item);

        res.status(201).json(furniture);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/:id', async (req, res) => {
    const furnitureId = req.params.id;

    try {
        const furniture = await furnitureService.getById(furnitureId);

        res.json(furniture);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.put('/:id', isAuth(), isCreator(), async (req, res) => {
    const furnitureId = req.params.id;

    const item = {
        make: req.body.make.trim(),
        model: req.body.model.trim(),
        year: Number(req.body.year),
        description: req.body.description.trim(),
        price: Number(req.body.price),
        img: req.body.img.trim(),
        material: req.body.material.trim(),
    };

    try {
        const updatedFurniture = await furnitureService.updateById(
            furnitureId,
            item
        );

        res.status(201).json(updatedFurniture);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.delete('/:id', isAuth(), isCreator(), async (req, res) => {
    const furnitureId = req.params.id;

    try {
        const deletedItem = await furnitureService.deleteById(furnitureId);

        res.json(deletedItem);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
