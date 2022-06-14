const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    myPublication: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
});

userSchema.index(
    { username: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
