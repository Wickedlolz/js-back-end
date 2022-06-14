const dbName = 'art-gallery';

exports.config = {
    port: process.env.PORT || 3000,
    DB_CONNECTION: `mongodb://localhost:27017/${dbName}`,
    JWT_SECRET: 'mysupersecretfordevelopmentmode',
    SALT_ROUNDS: 10,
};
