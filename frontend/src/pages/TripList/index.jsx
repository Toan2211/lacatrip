import React, { useEffect, useState } from 'react'
import TripCard from './TripCard'
import TripForm from '@page-components/TripForm'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import { allTripsSelector, getAllTrip } from './trip.slice'

function TripList() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const onClose = () => setShowModal(false)
    useEffect(() => {
        document.title = 'Lịch trình của bạn'
    }, [])
    const user = useSelector(selectUser)
    const trips = useSelector(allTripsSelector)
    useEffect(() => {
        dispatch(getAllTrip())
    }, [dispatch])
    if (!user.id)
        return <div className='h-screen'>Vui lòng đăng nhập để tạo lịch trình</div>
    return (
        <>
            <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[100vh]">
                <div className="flex justify-between mb-10">
                    <header className="font-bold text-3xl">
                        Lịch trình của bạn
                    </header>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex items-center"
                    >
                        <span className="font-semibold text-lg mr-3 mb-1">
                            +
                        </span>
                        <span className="text-sm">Tạo lịch trình mới</span>
                    </button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    {
                        trips && trips.map(trip => <TripCard key={trip.id} trip = {trip} />)
                    }
                </div>
            </div>
            <TripForm showModal = {showModal} onClose ={onClose}/>
        </>
    )
}

export default TripList
