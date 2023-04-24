const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const validator = require('validator');

const id_not_found_error = 'wallet id not found';
console.log("loaded");
const getTransactions = ((req, res) => {
    const walletId = req.params.walletId; 
    try {            
        Transaction.findAll({ where: { walletId } }).then(resource => {
            if (resource === null) {
                //go to wallet to see if wallet exsts, if not return 404 or return []
                return res.status(200).json([]);                
            }   
            return res.status(200).json(resource)});
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
});

// Lock so no race 
const createTransaction = ((req, res) => {
    const obj = {walletId:req.params.walletId, amount:req.body.amount, description:req.body.description}; 
    Transaction.create(obj).then(
        (resource) => {
            return res.status(201).json(resource);
        }
        ).catch((err) => {
            console.log(err);
            if (err.message=="Insufficient funds"){
                return res.status(400).json({ error: 'Insufficient funds' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        });
    })













module.exports = {getTransactions, createTransaction};