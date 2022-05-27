module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_CONNECTION: 'mongodb://localhost:27017/cubicle-workshop',
    },
    production: {
        port: process.env.PORT,
    },
};
