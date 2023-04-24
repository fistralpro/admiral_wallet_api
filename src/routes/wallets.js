const express = require('express');
const router = express.Router();
const { getWallet, createWallet} = require('../controllers/wallet');


router.post("/", createWallet);
router.get("/:id",getWallet);


module.exports = router