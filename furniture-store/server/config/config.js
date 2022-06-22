const env = process.env.PORT;

const config = {
    development: {
        port: 3000,
        DB_CONNECTION: 'mongodb://localhost:27017/furniture',
        JWT_SECRET: 'mybigestsupersecretfordevelopmentmode',
        SALT_ROUNDS: 10,
        COOKIE_NAME: 'user',
    },
    production: {
        port: process.env.PORT,
        DB_CONNECTION: process.env.DB_CONNECTION,
        JWT_SECRET: process.env.JWT_SECRET,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        COOKIE_NAME: process.env.COOKIE_NAME,
    },
};

module.exports = env ? config.production : config.development;
