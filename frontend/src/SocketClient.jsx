import { socketSelector } from '@pages/Chat/socket.slice'
import { addMessage } from '@pages/Chat/message.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOnline } from '@pages/Chat/message.slice'
import { getNotifications } from '@pages/Notification/notification.slice'

const spawnNotification = ({ body, icon, url, title }) => {
    let options = {
        body,
        icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

function SocketClient() {
    const { auth } = useSelector(state => state)
    const socket = useSelector(socketSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.profile.id) socket.emit('joinUser', auth.profile)
    }, [socket, auth])
    // useEffect(() => {
    //     socket.on('getUsers', users => {
    //         console.log('list user', users)
    //     })
    // }, [socket])
    //Message

    useEffect(() => {
        socket.on('addMessageToClient', message => {
            dispatch(addMessage(message))
        })
        return () => socket.off('addMessageToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('createNotifyToClient', notify => {
            spawnNotification(notify)
            dispatch(getNotifications())
        })
        return () => socket.off('createNotifyToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('getClientsToClient', clients => {
            dispatch(setCurrentOnline(clients))
        })
        return () => socket.off('getClientsToClient')
    }, [socket, dispatch])
    //romm
    // useEffect(() => {
    //     socket.on('joinRoomToClient', clients => {
    //         console.log('joinRoomToClient', clients)
    //     })
    //     // return () => socket.off('addMessageToClient')
    // }, [socket])
    return <></>
}

export default SocketClient
