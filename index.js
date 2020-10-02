require('dotenv').config();
const server = require('./api/server.js');

const port = process.env.PORT || 4051;

server.listen(port, () => {
    console.log(`\n***Listening on port ${port}***\n`);
});