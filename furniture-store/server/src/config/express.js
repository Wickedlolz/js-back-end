const express = require('express');
const cors = require('../middlewares/cors');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(auth());
};
