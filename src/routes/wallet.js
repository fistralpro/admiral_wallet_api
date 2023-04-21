const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  // res.send('wallet route ' + req.params['id'])
  res.status(200).send(get_wallet_response);
})

router.post('/', (req, res) => {
  // res.send('wallet GET route ' + req.params['id'])
    res.status(201).send(post_wallet_response);
})


router.get('/:id/transactions', (req, res) => {
  // res.send('wallet GET route ' + req.params['id'] + 'transaction')
  res.status(200).send(get_wallet_transaction_response);
})

router.post('/:id/transactions', (req, res) => {
  // res.send('wallet route ' + req.params['id'] + 'transaction')
  res.status(201).send(post_wallet_transaction_response);
})


const post_wallet_response = {
  "id": "string",
  "name": "savings pot",
  "balance": 10.23,
  "createdDate": "2023-04-21T00:10:05.838Z"
}

const get_wallet_response = {
  "id": "string",
  "name": "savings pot",
  "balance": 10.23,
  "createdDate": "2023-04-21T00:14:14.425Z"
}

const post_wallet_transaction_response = {
  "id": "string",
  "walletId": "string",
  "amount": 12.22,
  "balance": 65.87,
  "description": "string",
  "createdDate": "2023-04-21T00:14:46.011Z"
}

// TODO: discuss with PO as spec changed
const get_wallet_transaction_response = {
    transaction:[
    {
      "id": "string",
      "walletId": "string",
      "amount": 12.22,
      "balance": 65.87,
      "description": "string",
      "createdDate": "2023-04-21T00:15:44.510Z"
    }
  ]
}

module.exports = router