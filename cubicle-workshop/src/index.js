const env = process.env.PORT || 'development';

const config = require('./config/config')[env];
const app = require('express')();

init();

async function init() {
    await require('./config/mongoose')(config.DB_CONNECTION);
    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(
        config.port,
        console.log(`Listening on port ${config.port}! Now its up to you...`)
    );
}
