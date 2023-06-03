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
    return (
        <div>
            {profile.id && socket?.connected && <SocketClient />}
            <CommonProperty />
            <ToastContainer />
            <RoutesComponent />
        </div>
    )
}
export default App
