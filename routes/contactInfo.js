const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Contact = require('../models/CONTACT_INFO');

// Register
router.post('', (req,res,next) => {
    let newContact = new Contact({
        customer_id: req.body.customer_id,
        phone_no: req.body.phone_no,
        email: req.body.email,
        address: req.body.address,
    });

    Contact.addContactInfo(newContact, (err, contact) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add contact details'})
        }
        else{
            res.json({success: true, msg: 'contact details added'});
        }
    })
});

router.get('', function(req, res, next) {
    Contact.find(function (err, ContactData) {
        if(err) {
            res.send(err);
        }
        res.json(ContactData);
    })
})

router.get('/:id', function (req, res, next) {
    Contact.find({customer_id: req.params.id }, function (err, ContactData) {
        if(err) {
            res.send(err);
        }
        res.json(ContactData);  

    })
});

router.delete('/:id',function (req, res, next) {
    Contact.deleteOne({customer_id: req.params.id }, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);  
    })
} );

router.put('/:id',function (req, res, next) {
    Contact.updateOne({customer_id:req.params.id}, {
        $set: {
            phone_no: req.body.phone_no, email: req.body.email,
            address: req.body.address
        }
    }, function(err, Contact) {
        if(err) {
            res.send(err);
        }
        res.json(Contact);
    })
} );

module.exports = router;