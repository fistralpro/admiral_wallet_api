if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({debug: true});
}

const port = process.env.PORT || 1;
if (port === 1) {
  throw new Error("PORT not set: are we missing environment variables?")
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      res.status(400).json({message: "Invalid JSON"});
      throw new Error('Invalid JSON');
    }
  }
}));            

const swaggerUi = require('swagger-ui-express')
const jsYaml = require('js-yaml')
const fs = require('fs')

const options = { explorer: true }
const wallet = require('./routes/wallets')
const transaction = require('./routes/transactions');
const { log } = require('console');

const openApiDocument = jsYaml.load(fs.readFileSync('./src/spec/openapi.yaml', 'utf-8'))

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(openApiDocument, options))

app.use('/wallets', transaction)
app.use('/wallets', wallet)

//NB: transactions endpoint currently not implemented except as part of wallet

app.listen(port);