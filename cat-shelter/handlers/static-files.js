const fs = require('fs');

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('ico')) {
        return 'image/x-icon';
    }
}

module.exports = (req, res) => {
    const pathname = new URL(req.url, 'http://localhost:3000').pathname;

    if (pathname.startsWith('/content') && req.method == 'GET') {
        fs.readFile(`./${pathname}`, 'utf-8', (error, data) => {
            if (error) {
                console.error(error);

                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });

                res.write('404 Not Found');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': getContentType(pathname),
                });

                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }
};
