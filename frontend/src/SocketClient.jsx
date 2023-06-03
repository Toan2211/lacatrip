import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function SocketClient() {
    const { socket, auth } = useSelector(state => state)

    useEffect(() => {
        if (auth.profile.id)
            socket.socket.emit('joinUser', auth.profile)
    }, [socket, auth])


    return <></>
}

export default SocketClient
