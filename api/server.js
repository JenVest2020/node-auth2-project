const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

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

    store: new knexSessionStore({})
}

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());

server.use(cors());

module.exports = server;