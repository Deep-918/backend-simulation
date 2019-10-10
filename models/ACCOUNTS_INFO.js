const mongoose = require('mongoose');
const config = require('../config/database');

const accountInfoSchema = mongoose.Schema({
    customer_id: Number,
    account_Number: Number,
    account_type: String,
    LBalance: Number,
    ABalance: Number,
});

const accountInfo = module.exports = mongoose.model('accountInfo', accountInfoSchema);

module.exports.getAccountInfoById = function (id, callback) {
    const query = {customer_id: id}
    accountInfo.findOne(query,callback);
}

module.exports.addAccountInfo = function (newAccountInfo, callback) {
    newAccountInfo.save(callback);
}