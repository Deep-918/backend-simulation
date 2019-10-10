const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Customer = require('../models/CUST_INFO');

// Register
router.post('', (req,res,next) => {
    let newCustomer = new Customer({
        customer_id: req.body.customer_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        nationality: req.body.nationality,
        passport_number:req.body.passport_number,
        number_of_dependents:req.body.number_of_dependents,
        marital_status:req.body.marital_status,
    });

    Customer.addCustomerInfo(newCustomer, (err, customer) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add customer'})
        }
        else{
            res.json({success: true, msg: 'customer added'});
        }
    })
});

router.get('', function(req, res, next) {
    Customer.find(function (err, CustomerData) {
        if(err) {
            res.send(err);
        }
        res.json(CustomerData);
    })
})

router.get('/:id', function (req, res, next) {
    Customer.find({customer_id: req.params.id }, function (err, CustomerData) {
        if(err) {
            res.send(err);
        }
        res.json(CustomerData);  

    })
});

router.delete('/:id',function (req, res, next) {
    Customer.deleteOne({customer_id: req.params.id }, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);  
    })
} );

router.put('/:id',function (req, res, next) {
    Customer.updateOne({customer_id:req.params.id}, {
        $set: {
            firstname: req.body.firstname, lastname: req.body.lastname,
            nationality: req.body.nationality, marital_status: req.body.marital_status,
            number_of_dependents: req.body.number_of_dependents
        }
    }, function(err, Customer) {
        if(err) {
            res.send(err);
        }
        res.json(Customer);
    })
} );

module.exports = router;