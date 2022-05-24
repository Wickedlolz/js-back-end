const express = require('express');
const { engine } = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
};
