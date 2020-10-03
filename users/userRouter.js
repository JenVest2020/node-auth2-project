const router = require('express').Router();
const db = require('./usersModel');

router.get('/', (req, res) => {
    db.getUsers()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({ message: 'error retrieving users' });
        })
})

module.exports = router;