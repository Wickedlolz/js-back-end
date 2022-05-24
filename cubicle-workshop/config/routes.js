const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');

module.exports = (app) => {
    app.use(homeController);
    app.use(cubeController);
    app.all('*', (req, res) => {
        res.render('404');
    });
};
