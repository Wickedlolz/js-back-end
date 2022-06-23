const router = require('express').Router();

router.get('/', (req, res) =>
    res.json({ message: 'REST service operational' })
);

module.exports = router;
