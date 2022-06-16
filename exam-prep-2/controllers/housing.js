const router = require('express').Router();

router.get('/rent', (req, res) => {
    res.render('aprt-for-recent');
});

module.exports = router;
