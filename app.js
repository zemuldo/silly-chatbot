require('dotenv').config()
const fs = require('fs')

if(process.env.NODE_ENV === 'production') fs.writeFileSync('key.json', process.env.GCP_SERVICE_KEY)

const server = require('./server/app');
const socket = require('./ws/app');
const express = require('./express/app')

server.on('request', express);

server.listen(process.env.PORT, () => {
    console.info('\x1b[37m%s\x1b[0m',`Web server started at http://localhost:${process.env.PORT}`);
    console.info('\x1b[37m%s\x1b[0m',`Web Socket started at  ws://localhost:${process.env.PORT}`);
});