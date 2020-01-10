const express = require('express')

const app = express();

app.use('/', (req, res) => res.send({status: 'OK'}))

module.exports = app;