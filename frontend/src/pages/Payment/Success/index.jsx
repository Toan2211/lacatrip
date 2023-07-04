import React, { useEffect, useMemo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import confetti from 'canvas-confetti'
import { useDispatch, useSelector } from 'react-redux'
import { socketSelector } from '@pages/Chat/socket.slice'
import { getDetailNotify } from '@pages/Notification/notification.slice'
import { useLocation } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import queryString from 'query-string'

const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const socket = useSelector(socketSelector)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setShowConfetti(true)
        setShowModal(true)

        return () => {
            setShowConfetti(false)
            setShowModal(false)
        }
    }, [])
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min
    }
    useEffect(() => {
        if (showConfetti) {
            const duration = 5 * 1000
            const animationEnd = Date.now() + duration
            const defaults = {
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0
            }

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now()

                if (timeLeft <= 0) {
                    return clearInterval(interval)
                }

                const particleCount = 50 * (timeLeft / duration)
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: {
                            x: randomInRange(0.1, 0.3),
                            y: Math.random() - 0.2
                        }
                    })
                )
                confetti(
                    Object.assign({}, defaults, {
                        particleCount,
                        origin: {
                            x: randomInRange(0.7, 0.9),
                            y: Math.random() - 0.2
                        }
                    })
                )
            }, 250)
        }
    }, [showConfetti])
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            notificationId: params.notificationId
        }
    }, [location.search])
    useEffect(() => {
        if (socket && queryParams.notificationId) {
            dispatch(getDetailNotify(queryParams.notificationId))
                .then(unwrapResult)
                .then(res => socket.emit('createNotify', res.data))
        }
    }, [dispatch, queryParams, socket])
    useEffect(() => {
        document.title = 'Payment Success'
    }, [])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-pink-600">
            <CSSTransition
                in={showConfetti}
                timeout={5000}
                classNames="confetti"
                unmountOnExit
            >
                <canvas
                    id="confetti"
                    className="w-full h-full fixed top-0 left-0 pointer-events-none"
                ></canvas>
            </CSSTransition>
            <CSSTransition
                in={showModal}
                timeout={1000}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="max-w-md mx-auto p-6 rounded-lg shadow bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mx-auto text-green-500 animate-bounce"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        <h1 className="text-2xl text-center font-bold text-gray-800 mt-4">
                            Payment Successful!
                        </h1>
                        <p className="text-gray-600 text-center mt-2">
                            Thank you for your payment.
                        </p>
                        <div className="flex justify-center mt-6">
                            <a
                                href="/"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Go Back Home
                            </a>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default PaymentSuccess
