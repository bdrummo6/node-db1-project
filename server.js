const express = require('express');

const welcomeRouter = require('./api/welcome/welcome-router');
const accountsRouter = require('./api/accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/', welcomeRouter);
server.use('/api/accounts', accountsRouter);

module.exports = server;
