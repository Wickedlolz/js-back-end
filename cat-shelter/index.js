const http = require('http');
const config = require('./config/config');

const server = http.createServer((req, res) => {});

server.listen(config.PORT, () =>
    console.log('Server are listening on PORT: ' + config.PORT)
);
