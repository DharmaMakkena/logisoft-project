const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/items', itemsRoutes);

module.exports.handler = serverless(app);
