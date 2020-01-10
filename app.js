require('dotenv').config()

const server = require('./server/app');
const socket = require('./ws/app');

server.listen(process.env.PORT, () => {
    console.info('\x1b[37m%s\x1b[0m',`Web server started at http://localhost:${process.env.PORT}`);
    console.info('\x1b[37m%s\x1b[0m',`Web Socket started at  ws://localhost:${process.env.PORT}`);
});