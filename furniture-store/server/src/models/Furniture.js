const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const furnitureSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    material: { type: String },
    _ownerId: { type: ObjectId, ref: 'User' },
});

const Furniture = model('Furniture', furnitureSchema);

module.exports = Furniture;
