const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../routers/authRouter.js');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
    name: 'jvcookie',
    secret: 'SSSHHHH',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../data/db-config'),
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());

server.use(cors());
server.use('/api/auth', authRouter);

module.exports = server;