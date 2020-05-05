const express = require('express');
const { errors } = require('celebrate');

const routers = require('../routes');

const app = express();

app.use(express.json());
app.use('/api/v1', routers);
app.use(errors());

module.exports = app;
