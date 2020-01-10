const server = require('../server/app.js');
const processRequest = require('./chatbot/dialogue');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


const wss = new WebSocket.Server({
    server: server
});

let sessions = {};

wss.on('connection', (ws) => {
    let sessionId = uuidv4();
    sessions[sessionId] = {
        id: sessionId,
        date: new Date(),
    };

    ws.sessionId = sessionId

    ws.on('message', function (msg) {
        const incoming = JSON.parse(msg);
        switch (incoming.type) {
            case "login":
                ws.send(JSON.stringify({
                    type: 'sessionId',
                    msg: sessionId
                }));
                break;
            case "chat":
                if (!sessions[ws.sessionId]) {
                    ws.send(JSON.stringify({
                        msg: "Please login first"
                    }))
                }
                else {
                    return processRequest(msg)
                        .then(function (answer) {
                            if (ws.readyState === 1) {
                                ws.send(JSON.stringify({
                                    msg: answer
                                }))
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                        });
                }
                break;
            default:
                ws.send(JSON.stringify({
                    msg: "Please read the docs on how to communicate with me. Cheers!"
                }))
        }
    });
    ws.on('error', (err) => {
        console.log(err)
        delete sessions[ws.sessionId]
    });

    ws.on('close', () => {
        delete sessions[ws.sessionId]
    });
});

module.exports = wss;