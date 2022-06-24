const router = require('express').Router();

const furnitureController = require('../controllers/furniture');

router.get('/', (req, res) =>
    res.json({ message: 'REST service operational' })
);
router.use('/data/catalog', furnitureController);

module.exports = router;
