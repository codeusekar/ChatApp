const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const messageFormat = require('./utils/messages')
const app = express()
const { userJoined, getUser } =  require('./utils/users')

const server = http.createServer(app)
const io = socketio(server)

require('dotenv').config()

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', (socket) => {
    socket.on('enterRoom', (name) => {
        userJoined(socket.id, name)
        // Welcome user
        socket.emit('message', messageFormat("Bot-u Sekar", "Vanakkam! Idhu unga Code-u Sekar oda Chat Room"))

        // broadcast when user connects
        socket.broadcast.emit('message', messageFormat("Bot-u Sekar", `${name} joined the chat room`))

        // Runs when client disconnects
        socket.on('disconnect', () => {
            io.emit('message', messageFormat("Bot-u Sekar", `${name} left the chat room`))
        })
    })

    // Listen for chat message
    socket.on('chatMessage', (message) => {
        const user = getUser(socket.id)
        io.emit('message', messageFormat(user.name, message))
    })
})

var PORT = 8000 || process.env.PORT

server.listen(PORT, () => console.log('Chat server running on PORT 8000'))