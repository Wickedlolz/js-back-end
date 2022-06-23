const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./config');

module.exports = async function () {
    try {
        await mongoose.connect(DB_CONNECTION);
        console.log('DB connected.');

        mongoose.connection.on('error', (error) => {
            console.log('DB error: ');
            console.log(error);
        });
    } catch (error) {
        console.log('Database connection error:');
        console.log(error);
    }
};
