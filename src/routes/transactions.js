const express = require('express');
const router = express.Router();
const { getTransactions, createTransaction} = require('../controllers/transaction');

console.log("loaded");
router.post("/:walletId/transactions", createTransaction);
router.get("/:walletId/transactions",getTransactions);


module.exports = router