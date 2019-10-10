const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Account = require('../models/ACCOUNTS_INFO');

// Register
router.post('', (req,res,next) => {
    let newAccount = new Account({
        customer_id: req.body.customer_id,
        account_number: req.body.account_number,
        account_type: req.body.account_type,
        LBalance: req.body.LBalance,
        ABalance: req.body.ABalance
    });

    Account.addAccountInfo(newAccount, (err, account) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add account'})
        }
        else{
            res.json({success: true, msg: 'account added'});
        }
    })
});

router.get('', function(req, res, next) {
    Account.find(function (err, AccountData) {
        if(err) {
            res.send(err);
        }
        res.json(AccountData);
    })
})

router.get('/:id', function (req, res, next) {
    Account.find({customer_id: req.params.id }, function (err, AccountData) {
        if(err) {
            res.send(err);
        }
        res.json(AccountData);  

    })
});

router.delete('/:id',function (req, res, next) {
    Account.deleteOne({customer_id: req.params.id }, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);  
    })
} );

router.put('/:id',function (req, res, next) {
    Account.updateOne({customer_id:req.params.id}, {
        $set: {
            account_type: req.body.account_type, LBalance: req.body.LBalance,
            ABalance: req.body.ABalance
        }
    }, function(err, Account) {
        if(err) {
            res.send(err);
        }
        res.json(Account);
    })
} );

module.exports = router;