const config = {
    port: 3030,
    DB_CONNECTION: 'mongodb://localhost:27017/furniture',
    JWT_SECRET: 'mybigestsupersecretfordevelopmentmode',
    SALT_ROUNDS: 10,
    COOKIE_NAME: 'user',
};

module.exports = config;
