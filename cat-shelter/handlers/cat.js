const fs = require('fs');

module.exports = (req, res) => {
    const pathname = new URL(req.url, 'http://localhost:3000').pathname;

    if (pathname == '/cats/add-cat' && req.method == 'GET') {
        fs.readFile('./views/addCat.html', (error, data) => {
            if (error) {
                console.error(error);
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });

                res.write('404 Not Found');
                res.end();
            } else {
                res.write(data.toString());
                res.end();
            }
        });
    } else if (pathname == '/cats/add-breed' && req.method == 'GET') {
        fs.readFile('./views/addBreed.html', (error, data) => {
            if (error) {
                console.error(error);
                res.writeHead(404, {
                    'Content-Type': 'text/plain',
                });

                res.write('404 Not Found');
                res.end();
            } else {
                res.write(data.toString());
                res.end();
            }
        });
    } else if (pathname == '/cats/add-cat' && req.method == 'POST') {
    } else if (pathname == '/cats/add-breed' && req.method == 'POST') {
    } else {
        return true;
    }
};
