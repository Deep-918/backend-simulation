const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/database');
const Txn = require('../models/TXN_INFO');
const Account = require('../models/ACCOUNTS_INFO');

var newAmount;
var ABalance;

// Register
router.post('', (req,res,next) => {
    let newTxn = new Txn({
        account_number: req.body.account_number,
        amount: req.body.amount,
        transaction_type: req.body.transaction_type,
        transaction_id: req.body.transaction_id,
        description: req.body.description,
        date: req.body.date
    });

    Txn.addTxnInfo(newTxn, (err, txn) => {
        if(err) {
            res.json({success: false, msg: 'Failed to add txn details'})
        }
        else{
        findAccount(req.body.account_number, req.body.transaction_type, req.body.amount, function () {
            updateAccount(req.body.account_number)
        });
        request({
            url:"http://localhost:8085/kafka/publish/transaction",
            method: "POST",
            json: newTxn,
        }, function (error,response, body) {
            if(!error && response.statusCode === 200){
                console.log(body)
            }
            else
            {
                console.log("error: " + error);
                
            }
        })
            res.json({success: true, msg: 'txn details added'});
        }
    })
});

router.get('', function(req, res, next) {
    Txn.find(function (err, TxnData) {
        if(err) {
            res.send(err);
        }
        res.json(TxnData);
    })
})

router.get('/:id', function (req, res, next) {
    Txn.find({transaction_id: req.params.id }, function (err, TxnData) {
        if(err) {
            res.send(err);
        }
        res.json(TxnData);  

    })
});

router.delete('/:id',function (req, res, next) {
    Txn.deleteOne({transaction_id: req.params.id }, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);  
    })
} );

function findAccount(accountNumber, type, amount, callback) {
    Account.findOne({account_number: accountNumber}, {ABalance: 1, LBalance: 1}, function (err, AccountData) {
        if(err)
        {
            return;
        }
        ABalance = AccountData.ABalance;
        if(type == 'DR') {
            newAmount = ABalance - amount;
        }
        else{
            newAmount = ABalance + amount;
        }
        callback();
    });
}

function updateAccount(accountNumber) {
    Account.updateOne({account_number:accountNumber}, {
        $set: {
            LBalance: ABalance,
            ABalance: newAmount
        }
    }, function(err, Account) {
        if(err) {
            return;
        }
    });
}

module.exports = router;