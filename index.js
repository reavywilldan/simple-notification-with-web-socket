const express = require('express')
const app = express()

const server = require('http').createServer(app)

const WebSocket = require('ws')

const WebSocketServer = new WebSocket.Server({ server })

WebSocketServer.on('connection', function connection(ws) {
    console.log('A new client connected')
    ws.send('Welcome new client')

    ws.on('message', function incoming(message) {
        console.log(`received: ${message}`)

        WebSocketServer.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    })
})

app.get('/', (req, res) => {
    console.log('Hello Client')
})

server.listen(3000, () => {
    console.log('listening on port 3000')
})