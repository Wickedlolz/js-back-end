const fs = require('fs');
const formidable = require('formidable');
const uniqid = require('uniqid');

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
                fs.readFile(
                    './data/breeds.json',
                    { encoding: 'utf-8' },
                    (err, breedsData) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        const breeds = JSON.parse(breedsData);
                        const file = data.toString().replace(
                            '{{{breeds}}}',
                            breeds.map(
                                (b) =>
                                    `<option value="${b.name}">${b.name}</option>`
                            )
                        );

                        res.write(file);
                        res.end();
                    }
                );
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
        const form = formidable({ multiples: true });
        form.parse(req, (error, fields, files) => {
            if (error) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain',
                });
                res.end();
                return;
            }

            fs.readFile(
                './data/cats.json',
                { encoding: 'utf-8' },
                (error, data) => {
                    if (error) {
                        console.error(error);
                        res.writeHead(404, {
                            'Content-Type': 'text/plain',
                        });

                        res.write('404 Not Found');
                        res.end();
                    } else {
                        const cats = JSON.parse(data);
                        cats.push({
                            id: uniqid(),
                            name: fields.name,
                            description: fields.description,
                            breed: fields.breed,
                            image: fields.image,
                        });
                        fs.writeFile(
                            './data/cats.json',
                            JSON.stringify(cats),
                            {
                                encoding: 'utf-8',
                            },
                            (err) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            }
                        );

                        res.writeHead(301, { Location: '/' });
                        res.end();
                    }
                }
            );
        });
    } else if (pathname == '/cats/add-breed' && req.method == 'POST') {
        const form = formidable({ multiples: true });
        form.parse(req, (error, fields, files) => {
            fs.readFile(
                './data/breeds.json',
                { encoding: 'utf-8' },
                (error, data) => {
                    if (error) {
                        console.error(error);
                        res.writeHead(404, {
                            'Content-Type': 'text/plain',
                        });

                        res.write('404 Not Found');
                        res.end();
                    } else {
                        const breeds = JSON.parse(data);
                        breeds.push({
                            name: fields.breed,
                        });

                        fs.writeFile(
                            './data/breeds.json',
                            JSON.stringify(breeds),
                            { encoding: 'utf-8' },
                            (error) => {
                                if (error) {
                                    console.error(error);
                                    return;
                                }
                            }
                        );

                        res.writeHead(301, { Location: '/' });
                        res.end();
                    }
                }
            );
        });
    } else {
        return true;
    }
};
