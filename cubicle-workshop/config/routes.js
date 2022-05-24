const homeController = require('../controllers/home');

module.exports = (app) => {
    app.use('/', homeController);
};
