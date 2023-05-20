import 'react-toastify/dist/ReactToastify.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { React } from 'react'
import RoutesComponent from '@routes'
import { ToastContainer } from 'react-toastify'
import CommonProperty from '@pages/CommonProperty'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
    return (
        <div>
            <CommonProperty />
            <ToastContainer />
            <RoutesComponent />
        </div>
    )
}
export default App
