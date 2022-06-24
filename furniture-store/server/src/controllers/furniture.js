const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const furnitureService = require('../services/furniture');

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
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material,
        _ownerId: req.user._id,
    };
});

module.exports = router;
