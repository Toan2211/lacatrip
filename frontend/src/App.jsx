import 'react-toastify/dist/ReactToastify.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { React, useEffect } from 'react'
import RoutesComponent from '@routes'
import { ToastContainer } from 'react-toastify'
import CommonProperty from '@pages/CommonProperty'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setSocket } from '@pages/Chat/socket.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import SocketClient from './SocketClient'
import { socketSelector } from '@pages/Chat/socket.slice'
import './i18n/i18n'
function App() {
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)
    const socket = useSelector(socketSelector)
    useEffect(() => {
        const socket = io(import.meta.env.VITE_URL_SOCKET, {
            withCredentials: true,
            extraHeaders: {
                'my-custom-header': 'abcd'
            }
        })
        dispatch(setSocket(socket))
        return () => {
            socket.close()
            setSocket(null)
        }
    }, [dispatch])
    useEffect(() => {
        if (!('Notification' in window)) {
            alert(
                'This browser does not support desktop notification'
            )
        } else if (Notification.permission === 'granted') {
            /* empty */
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (
                permission
            ) {
                if (permission === 'granted') {
                    /* empty */
                }
            })
        }
    }, [])
    useEffect(() => {
        document.title = 'Lacatrip'
    }, [])
    return (
        <div>
            {profile.id && socket && <SocketClient />}
            <CommonProperty />
            <ToastContainer />
            <RoutesComponent />
        </div>
    )
}
export default App
