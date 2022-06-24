const router = require('express').Router();

const furnitureService = require('../services/furniture');

router.get('/', async (req, res) => {
    try {
        const items = await furnitureService.getAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ message: 'Bad request.' });
    }
});

router.post('/', async (req, res) => {});

module.exports = router;
