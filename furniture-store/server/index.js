const express = require('express');
const initDb = require('./config/mongoose');
const config = require('./config/config');
const routes = require('./config/routes');

init();

async function init() {
    await initDb();
    const app = express();
    require('./config/express')(app);
    app.use(routes);

    app.listen(config.port, () =>
        console.log(`Server are running at http://localhost:${config.port}/`)
    );
}
