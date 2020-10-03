const router = require('express').Router();
const users = require('../users/usersModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.post('/register', async (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    try {
        const saved = await users.add(user);
        res.status(201).json(saved);
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'error registering', ...err });
    }
})

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;

    try {
        const user = await users.findBy({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            req.session.user = user;
            res.status(200).json({ message: `welcome ${username}, have a cookie!`, token: token });
        } else {
            next({ apiCode: 401, apiMessage: 'You shall not pass!' })
        }
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'error logging in', ...err });
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;