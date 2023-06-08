import React, { useEffect, useRef, useState } from 'react'
import ChatCard from './ChatCard'
import { useDispatch, useSelector } from 'react-redux'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import { toast } from 'react-toastify'
import {
    createMessage,
    currentOnelineSelector,
    setCurrentConversation
} from './message.slice'
import { currentConversationSelector } from './message.slice'
import { getConversationByTripId } from './message.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { socketSelector } from './socket.slice'
import { createNotification } from '@pages/Notification/notification.slice'
import { readNotification } from '@pages/Notification/notification.slice'

function Chat() {
    const dispatch = useDispatch()
    const socket = useSelector(socketSelector)
    const currentTrip = useSelector(currentTripSelector)
    const conversations = useSelector(currentConversationSelector)
    const currentOnline = useSelector(currentOnelineSelector)
    const user = useSelector(selectUser)
    const [messageInput, setMessageInput] = useState('')
    const refDisplay = useRef()
    const handleMessageInputChange = e =>
        setMessageInput(e.target.value)
    const handleSendMessage = async () => {
        try {
            if (!messageInput) return
            const formData = new FormData()
            formData.append('tripId', currentTrip.id)
            formData.append('content', messageInput)
            if (image) formData.append('image', image)
            const res = await dispatch(createMessage(formData))
            const messageSended = unwrapResult(res)
            socket.emit('addMessage', {
                room: currentTrip.id,
                message: messageSended.data,
                members: currentTrip.members
            })
            socket.emit('getUsersInRoom', {
                room: currentTrip.id,
                userId: user.id
            })
            for (const member of currentTrip.members) {
                const isOnline = currentOnline.find(
                    item => item.id === member.id
                )
                if (!isOnline && member.id !== user.id)
                    dispatch(
                        createNotification({
                            receiverId: member.id,
                            tripId: currentTrip.id,
                            url: `/trip/${currentTrip.id}`,
                            message: messageSended.data.image
                                ? 'Sent a photo'
                                : messageSended.data.content
                        })
                    ).then(res => unwrapResult(res))
            }
            setMessageInput('')
            setPreviewSource('')
            setImage(null)
            if (refDisplay.current) {
                refDisplay.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                })
            }
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const handleKeyPress = async event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            await handleSendMessage()
        }
    }
    //image
    const [image, setImage] = useState(null)
    const [previewSource, setPreviewSource] = useState('')
    const handleChangeImg = e => {
        const file = e.target.files[0]
        if (file) setImage(file)
        previewFile(file)
    }
    const previewFile = file => {
        if (!file) return
        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const handleDeleteImage = () => {
        setPreviewSource('')
        setImage(null)
    }
    useEffect(() => {
        if (currentTrip.id) {
            dispatch(
                getConversationByTripId({
                    tripId: currentTrip.id
                })
            )
            dispatch(
                readNotification({
                    tripId: currentTrip.id
                })
            )
        }
        return () => {
            dispatch(setCurrentConversation([]))
        }
    }, [currentTrip, dispatch])
    useEffect(() => {
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }
    }, [conversations])
    const onScroll = e => {
        if (e.currentTarget.scrollTop === 0 && conversations.length > 0) {
            dispatch(
                getConversationByTripId({
                    tripId: currentTrip.id,
                    params: {
                        time: conversations[0].createdAt
                    }
                })
            )
        }
    }
    return (
        <div className="h-full flex flex-col">
            <header className=" font-semibold bg-slate-200 p-4 text-lg uppercase rounded-md">
                Chat between tripmate
            </header>
            <div
                className="overflow-y-scroll flex-1  gap-2 p-2 h-[calc(100%-200px)]"
                onScroll={onScroll}
            >
                <div className="flex flex-col w-full max-h-full">
                    {conversations.map((message, index) => (
                        <ChatCard
                            key={index}
                            isSender={
                                message.senderId === user.id
                                    ? 1
                                    : null
                            }
                            image={message.image}
                            message={message}
                        />
                    ))}
                    <span className="" ref={refDisplay}></span>
                </div>
            </div>
            <div className="h-12 px-3 py-1">
                {previewSource && (
                    <div className="relative h-10 w-10 group group-hover:border group-hover:border-red-500 group-hover:border-solid">
                        <img
                            className="  w-full h-full rounded object-cover cursor-pointer"
                            src={previewSource}
                        />

                        <span
                            onClick={handleDeleteImage}
                            className="group-hover:flex hidden absolute w-full h-full left-0 top-0 justify-center items-center text-red-500 font-bold cursor-pointer group-hover:bg-black group-hover:bg-opacity-50"
                        >
                            <span className="w-6 h-6 rounded-full border border-red-500 border-solid flex justify-center items-center">
                                X
                            </span>
                        </span>
                    </div>
                )}
            </div>

            <div className="flex p-4 items-center gap-3">
                <div className="">
                    <label>
                        <input
                            type="file"
                            id="upFile"
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.svg"
                            onChange={handleChangeImg}
                        />
                        <svg
                            height="20px"
                            width="20px"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 280.067 280.067"
                            fill="red"
                            className=" cursor-pointer"
                        >
                            <g>
                                <path
                                    d="M149.823,257.142c-31.398,30.698-81.882,30.576-113.105-0.429
		c-31.214-30.987-31.337-81.129-0.42-112.308l-0.026-0.018L149.841,31.615l14.203-14.098c23.522-23.356,61.65-23.356,85.172,0
		s23.522,61.221,0,84.586l-125.19,123.02l-0.044-0.035c-15.428,14.771-40.018,14.666-55.262-0.394
		c-15.244-15.069-15.34-39.361-0.394-54.588l-0.044-0.053l13.94-13.756l69.701-68.843l13.931,13.774l-83.632,82.599
		c-7.701,7.596-7.701,19.926,0,27.53s20.188,7.604,27.88,0L235.02,87.987l-0.035-0.026l0.473-0.403
		c15.682-15.568,15.682-40.823,0-56.39s-41.094-15.568-56.776,0l-0.42,0.473l-0.026-0.018l-14.194,14.089L50.466,158.485
		c-23.522,23.356-23.522,61.221,0,84.577s61.659,23.356,85.163,0l99.375-98.675l14.194-14.089l14.194,14.089l-14.194,14.098
		l-99.357,98.675C149.841,257.159,149.823,257.142,149.823,257.142z"
                                />
                            </g>
                        </svg>
                    </label>
                </div>
                <input
                    onKeyPress={handleKeyPress}
                    value={messageInput}
                    onChange={handleMessageInputChange}
                    className="border border-gray-300 px-2 py-2 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button
                    onClick={handleSendMessage}
                    className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold  px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
