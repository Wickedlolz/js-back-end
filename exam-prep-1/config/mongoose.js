const mongoose = require('mongoose');
const { config } = require('./config');

module.exports = async function () {
    try {
        await mongoose.connect(config.DB_CONNECTION);
        console.log('Database connected.');

        mongoose.connection.on('error', (error) => {
            console.error('Connection error:');
            console.error(error);
        });
    } catch (error) {
        console.error('Database connection error:');
        console.error(error);
    }
};
