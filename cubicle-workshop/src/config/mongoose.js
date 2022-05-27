const mongoose = require('mongoose');

module.exports = async (connectionString) => {
    try {
        await mongoose.connect(connectionString);
        console.log('DB connected.');

        mongoose.connection.on('error', (error) => console.error(error));
    } catch (error) {
        console.error('Database connection error.');
        console.error(error);
    }
};
