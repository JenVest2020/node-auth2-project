const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const userRouter = require('../users/userRouter');
const authRouter = require('../auth/authRouter');


const server = express();

const sessionConfig = {
    name: 'jvcookie2',
    secret: 'Its a secret',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    Store: new knexSessionStore({
        knex: require('../data/db-config'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());

server.use(cors());
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;