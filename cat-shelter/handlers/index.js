const homeHandler = require('./home');
const staticFilesHandler = require('./static-files');
const catHandler = require('./cat');
const notFound = require('./not-found');

module.exports = [homeHandler, staticFilesHandler, catHandler];
