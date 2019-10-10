const mongoose = require('mongoose');
const config = require('../config/database');

const customerInfoSchema = mongoose.Schema({
    customer_id: Number,
    firstname: String,
    lastname: String,
    gender: String,
    dob: String,
    nationality: String,
    passport_number: String,
    number_of_dependents: Number,
    marital_status: String
});

const customerInfo = module.exports = mongoose.model('customerInfo', customerInfoSchema);

module.exports.getCustomerInfoById = function (id, callback) {
    const query = {customer_id: id}
    customerInfo.findOne(query,callback);
}

module.exports.addCustomerInfo = function (newCustomeInfo, callback) {
    newCustomeInfo.save(callback);
}