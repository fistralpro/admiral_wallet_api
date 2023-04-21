const express = require('express');
const router = express.Router();
const {getWallet, createWallet} = require('../controllers/wallet');

router.get("/:id",getWallet);
router.post("/", createWallet);

module.exports = router