const express = require('express');
const initDb = require('./src/config/mongoose');
const config = require('./src/config/config');
const routes = require('./src/config/routes');

init();

async function init() {
    await initDb();
    const app = express();
    require('./src/config/express')(app);
    app.use(routes);

    app.listen(config.port, () =>
        console.log(`Server are running at http://localhost:${config.port}/`)
    );
}
