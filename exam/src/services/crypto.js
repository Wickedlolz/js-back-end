const Crypto = require('../models/Crypto');

exports.getAll = function (query) {
    const options = {};

    if (query && query.searchCoin) {
        options.name = new RegExp(query.searchCoin.toLocaleLowerCase(), 'i');
    } else if (query && query.paymentMethod) {
        options.paymentMethod = new RegExp(
            query.paymentMethod.toLocaleLowerCase(),
            'i'
        );
    }
    return Crypto.find(options);
};

exports.getById = function (cryptoId) {
    return Crypto.findById(cryptoId);
};

exports.create = async function (cryptoData) {
    const crypto = new Crypto({
        name: cryptoData.name,
        image: cryptoData.image,
        price: Number(cryptoData.price),
        description: cryptoData.description,
        paymentMethod: cryptoData.paymentMethod,
        owner: cryptoData.owner,
    });

    await crypto.save();

    return crypto;
};

exports.updateById = async function (cryptoId, cryptoData) {
    const crypto = await Crypto.findById(cryptoId);

    crypto.name = cryptoData.name;
    crypto.image = cryptoData.image;
    crypto.price = cryptoData.price;
    crypto.description = cryptoData.description;
    crypto.paymentMethod = cryptoData.paymentMethod;

    await crypto.save();

    return crypto;
};

exports.deleteById = async function (cryptoId) {
    await Crypto.findByIdAndDelete(cryptoId);
};

exports.buy = async function (cryptoId, userId) {
    const crypto = await Crypto.findById(cryptoId);

    if (crypto.buy.find((u) => u == userId)) {
        throw new Error('User already buy this coin.');
    }

    crypto.buy.push(userId);

    await crypto.save();

    return crypto;
};
