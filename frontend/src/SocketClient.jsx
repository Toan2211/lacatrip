import { socketSelector } from '@pages/Chat/socket.slice'
import { addMessage } from '@pages/Chat/message.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

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
            toast.success(notify, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        })
        return () => socket.off('createNotifyToClient')
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
