const env = process.env.PORT;

const config = {
    development: {
        port: process.env.PORT || 3000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle-workshop',
        JWT_SECRET: 'jwtsupersecretfordevelopmentmode',
    },
    production: {
        port: process.env.PORT,
        DB_CONNECTION: process.env.DB_CONNECTION,
        JWT_SECRET: process.env.JWT_SECRET,
    },
};

module.exports = env ? config.production : config.development;
