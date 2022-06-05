const homeController = require('../controllers/home');
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');

module.exports = (app) => {
    app.use(homeController);
    app.use(cubeController);
    app.use(accessoryController);
    app.use(userController);
    app.all('*', (req, res) => {
        res.render('404');
    });
};
