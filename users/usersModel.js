const db = require('../data/db-config');

function add(user) {
    return db('users').insert(user, 'id');
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id');
}

function getUsers() {
    return db('users');
}

module.exports = {
    add,
    findBy,
    getUsers
}