const http = require('http');
const config = require('./config/config');
const handlers = require('./handlers');

const server = http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
});

server.listen(config.PORT, () =>
    console.log('Server are listening on PORT: ' + config.PORT)
);
