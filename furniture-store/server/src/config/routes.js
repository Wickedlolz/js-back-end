const router = require('express').Router();

const furnitureController = require('../controllers/furniture');
const usersController = require('../controllers/users');

router.get('/', (req, res) =>
    res.json({ message: 'REST service operational' })
);
router.use('/data/catalog', furnitureController);
router.use('/users', usersController);

module.exports = router;
