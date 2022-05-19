const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = new URL(req.url, 'http://localhost:3000').pathname;
    let filePath = path.normalize(
        path.join(__dirname, '../views/home/index.html')
    );

    if (pathname == '/' && req.method == 'GET') {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.error(error);
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });

                res.write('404 Not Found');
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }
};
