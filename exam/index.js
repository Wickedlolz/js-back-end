const express = require('express');
const { config } = require('./src/config/config');
const initDb = require('./src/config/mongoose');
const routes = require('./src/config/routes');

init();

async function init() {
    await initDb();
    const app = express();
    require('./src/config/express')(app);
    app.use(routes);

    app.listen(config.port, () =>
        console.log(
            `⚡️ [server]: Server is running at http://localhost:${config.port}/`
        )
    );
}
