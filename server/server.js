const express = require('express')
const cors = require('cors')
const app = express()
const route = require('./src/routes')
const http = require('http')
const server = http.createServer(app)

const socketIO = require('socket.io')
const io = socketIO(server, {
    cors: {
        origin: process.env.REACT_API,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})

require('dotenv').config()

const db = require('./src/models')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-credentials', true)
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, UPDATE'
    )
    next()
})
db.sequelize.sync()
app.use(
    cors({
        origin: process.env.REACT_API
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', route)
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

let users = []
io.on('connection', socket => {
    socket.on('joinUser', user => {
        const checkInList = users.find(temp => temp.id === user.id)
        if (!checkInList)
            users.push({ id: user.id, socketId: socket.id })
        socket.emit('getUsers', users)
    })

    socket.emit('getUsers', users)

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
    })

    socket.on('joinRoom', room => {
        socket.join(room)
        const clients = getClientsInRoom(room)
        // console.log('room',room, clients)
        socket.emit('get clients', {
            clients: clients
        })
    })

    socket.on('leaveRoom', room => {
        socket.leave(room)
        socket.to(room).emit('user left', socket.id)
    })

    socket.on('chat message', ({ room, message }) => {
        socket
            .to(room)
            .emit('chat message', { id: socket.id, message })
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        users = users.filter(user => user.socketId !== socket.id)
    })
})

const getClientsInRoom = room => {
    const clients = io.sockets.adapter.rooms.get(room)
    const clientList = []

    if (clients) {
        for (const clientId of clients) {
            const clientSocket = io.sockets.sockets.get(clientId)
            const clientInfo = {
                id: clientSocket.id
            }
            clientList.push(clientInfo)
        }
    }

    return clientList
}
