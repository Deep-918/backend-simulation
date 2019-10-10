const mongoose = require('mongoose');
const config = require('../config/database');

const txnInfoSchema = mongoose.Schema({
    account_Number: String,
    transaction_type: String,
    amount: Number,
    transaction_id: Number,
    description: String,
    date: String
});

const txnInfo = module.exports = mongoose.model('txnInfo', txnInfoSchema);

module.exports.getTransactionInfoById = function (id, callback) {
    const query = {transaction_id: id}
    txnInfo.findOne(query,callback);
}

module.exports.addTxnInfo = function (newTxnInfo, callback) {
    newTxnInfo.save(callback);
}