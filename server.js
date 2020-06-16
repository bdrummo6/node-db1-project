const express = require('express');

const mainRouter = require('./api/main-router');
const accountsRouter = require('./api/account-router');

const server = express();

server.use(express.json());

server.use('/api/', mainRouter);
server.use('/api/accounts', accountsRouter);

module.exports = server;
