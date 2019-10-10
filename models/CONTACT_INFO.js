const mongoose = require('mongoose');
const config = require('../config/database');

const contactInfoSchema = mongoose.Schema({
    customer_id: Number,
    phone_no: String,
    email: String,
    address: {
     add_id:Number,
     line_1:String,
     line_2:String,
     line_3:String,
     city:String,
     state:String,
     zip_code:Number,
     country:String,
    }
});

const contactInfo = module.exports = mongoose.model('contactInfo', contactInfoSchema);

module.exports.getContactInfoById = function (id, callback) {
    const query = {customer_id: id}
    contactInfo.findOne(query,callback);
}

module.exports.addContactInfo = function (newContactInfo, callback) {
    newContactInfo.save(callback);
}