const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');

module.exports = (app) => {
    app.use(homeController);
    app.use(cubeController);
    app.use(accessoryController);
    app.all('*', (req, res) => {
        res.render('404');
    });
};
