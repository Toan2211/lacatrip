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
        let clients = getClientsInRoom(room)
        const clientsArr = clients.map(client =>
            users.find(user => user.socketId === client.id)
        )
        clients.forEach(client => {
            socket
                .to(`${client.id}`)
                .emit('getClientsToClient', clientsArr)
        })
    })

    socket.on('leaveRoom', room => {
        socket.leave(room)
        socket.to(room).emit('user left', socket.id)
        let clients = getClientsInRoom(room)
        const clientsArr = clients.map(client =>
            users.find(user => user.socketId === client.id)
        )
        clients.forEach(client => {
            socket
                .to(`${client.id}`)
                .emit('getClientsToClient', clientsArr)
        })
    })

    socket.on('getUsersInRoom', ({ room, userId }) => {
        const clients = getClientsInRoom(room)
        const user = users.find(user => user.id === userId)
        if (user) {
            socket
                .to(user.socketId)
                .emit('getUsersInRoomToClient', { clients: clients })
        }
    })

    socket.on('addMessage', ({ room, message, members }) => {
        const clients = getClientsInRoom(room)
        socket.emit('joinRoomToClient', clients)
        let membersTrip = [...members]
        const userSend = users.find(
            user => user.id === message.senderId
        )
        membersTrip = membersTrip.filter(
            member => member.id !== message.senderId
        )
        if (!userSend) return
        clients.forEach(client => {
            if (client.id !== userSend.socketId) {
                const userClient = users.find(
                    user => user.socketId === client.id
                )
                if (userClient) {
                    membersTrip = membersTrip.filter(
                        member => member.id !== userClient.id
                    )
                    socket
                        .to(`${client.id}`)
                        .emit('addMessageToClient', message)
                }
            }
        })
        const notification = {
            body:
                message.user.firstname +
                message.user.lastname +
                ': ' +
                message.content,
            icon: message.user.avatar,
            url: `${process.env.REACT_API}/trip/${message.tripId}`,
            title: 'Lacatrip'
        }
        for (const member of membersTrip) {
            const user = users.find(user => user.id === member.id)
            if (user) {
                socket
                    .to(`${user.socketId}`)
                    .emit('createNotifyToClient', notification)
            }
        }
    })

    socket.on('createNotify', notify => {
        const notification = {
            body:
                notify.sender.firstname +
                notify.sender.lastname +
                ': ' +
                notify.message,
            icon: notify.sender.avatar,
            url: `${process.env.REACT_API}/${notify.url}`,
            title: 'Lacatrip'
        }
        const user = users.find(user => user.id === notify.receiverId)
        if (user) {
            socket
                .to(`${user.socketId}`)
                .emit('createNotifyToClient', notification)
        }
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

// cron job run
const paypalController = require('./src/controllers/paymentPaypal')
var cron = require('node-cron')
cron.schedule(process.env.CRON_JOB, () => {
    console.log('running a task every 3 minute', new Date().toLocaleString())
    paypalController.payOutToServiceManager()
})
