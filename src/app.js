if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000;
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
const wallet = require('./routes/wallet')

const openApiDocument = jsYaml.load(fs.readFileSync('./src/spec/openapi.yaml', 'utf-8'))

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(openApiDocument, options))

app.use('/wallet', wallet)

app.listen(port);