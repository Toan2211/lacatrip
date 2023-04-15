import 'react-toastify/dist/ReactToastify.css'
import { React } from 'react'
import RoutesComponent from '@routes'
import { ToastContainer } from 'react-toastify'
function App() {
    return (
        <div>
            <ToastContainer />
            <RoutesComponent />
        </div>
    )
}
export default App
