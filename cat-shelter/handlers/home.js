const fs = require('fs');
const path = require('path');

const catCard = (cat) => `
    <li>
        <img src="${cat.image}" alt="Black Cat">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="/cats/edit?id=${cat.id}">Change Info</a></li>
            <li class="btn delete"><a href="/cats-find-new-home?id=${cat.id}">New Home</a></li>
        </ul>
    </li>
`;

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
                fs.readFile(
                    './data/cats.json',
                    { encoding: 'utf-8' },
                    (error, catsData) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        const cats = JSON.parse(catsData);

                        const homePage = data
                            .toString()
                            .replace('{{{cats}}}', cats.map(catCard).join(''));
                        res.write(homePage);
                        res.end();
                    }
                );
            }
        });
    } else if (pathname.includes('/search') && req.method == 'GET') {
        const [_, search] = new URL(
            req.url,
            'http://localhost:3000'
        ).search.split('=');

        fs.readFile(
            './views/home/index.html',
            { encoding: 'utf-8' },
            (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                fs.readFile(
                    './data/cats.json',
                    { encoding: 'utf-8' },
                    (err, catsData) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        let cats = JSON.parse(catsData);

                        cats = cats.filter((c) =>
                            c.name
                                .toLocaleLowerCase()
                                .includes(search.toLocaleLowerCase())
                        );

                        const homePage = data
                            .toString()
                            .replace('{{{cats}}}', cats.map(catCard).join(''));
                        res.write(homePage);
                        res.end();
                    }
                );
            }
        );
    } else {
        return true;
    }
};
