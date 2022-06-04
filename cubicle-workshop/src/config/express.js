const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('hbs', engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', './src/views');
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
};
