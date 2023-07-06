import { selectUser } from '@pages/Auth/auth.slice'
import { path } from '@constants/path'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal } from 'flowbite-react'
import TripForm from '@page-components/TripForm'
import { allTripsSelector } from '@pages/TripList/trip.slice'
import {
    DESTINATIONTYPE,
    HOTELTYPE,
    RESTAURANTTYPE
} from '@constants/instanceType'
import {
    addInstanceToTripList,
    removeInstaceFromTripList
} from '@pages/TripList/trip.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'

function LikeToTrip({ id, type }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const trips = useSelector(allTripsSelector)
    const [tym, setTym] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const onCloseModalCreate = () => {
        setShowModalCreate(false)
        setShowModal(true)
    }
    const onClose = () => setShowModal(false)
    const profile = useSelector(selectUser)
    const handleCLickTym = () => {
        if (!profile.id) {
            navigate(path.signin)
            toast.error(t('pleaseSignin'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
            return
        }
        setShowModal(true)
        // setTym(!tym)
    }
    const handleCreateTrip = () => {
        onClose()
        setShowModalCreate(true)
    }
    useEffect(() => {
        let tymflag = false
        for (const trip of trips) {
            if (
                (type === HOTELTYPE &&
                    trip.hotels.findIndex(
                        hotel => hotel.id === id
                    ) !== -1) ||
                (type === RESTAURANTTYPE &&
                    trip.restaurants.findIndex(
                        restaurant => restaurant.id === id
                    ) !== -1) ||
                (type === DESTINATIONTYPE &&
                    trip.destinationTravels.findIndex(
                        destinationTravel =>
                            destinationTravel.id === id
                    ) !== -1)
            ) {
                setTym(true)
                tymflag = true
                break
            }
        }
        if (!tymflag) setTym(false)
    }, [trips, id, type])
    const handleClickOnTripCard = async (tripId, tripIndex) => {
        try {
            const data = {
                tripId: tripId,
                instanceId: id,
                type: type
            }
            if (
                (type === HOTELTYPE &&
                    trips[tripIndex].hotels.findIndex(
                        hotel => hotel.id === id
                    ) !== -1) ||
                (type === RESTAURANTTYPE &&
                    trips[tripIndex].restaurants.findIndex(
                        restaurant => restaurant.id === id
                    ) !== -1) ||
                (type === DESTINATIONTYPE &&
                    trips[tripIndex].destinationTravels.findIndex(
                        destinationTravel =>
                            destinationTravel.id === id
                    ) !== -1)
            ) {
                await dispatch(removeInstaceFromTripList(data)).then(
                    res => unwrapResult(res)
                )
                toast.success(t('removeFromTripSuccessfully'), {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                })
            } else {
                await dispatch(addInstanceToTripList(data)).then(
                    res => unwrapResult(res)
                )
                toast.success(t('addToTripSuccessfully'), {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                })
                onClose()
            }
            onClose()
        } catch (error) {
            toast.error(t(error.message), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <>
            <div
                onClick={handleCLickTym}
                className=" absolute top-3 right-3 z-10 w-10 h-10 bg-white flex justify-center items-center rounded-full cursor-pointer shadow-sm"
            >
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    className=" hover:fill-red-500"
                    fill={`${tym ? 'red' : 'transparent'}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="Interface / Heart_02">
                        <path
                            id="Vector"
                            d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            </div>
            <Modal show={showModal} onClose={onClose} size="md">
                <Modal.Header className=" bg-slate-100">
                    {t('createTripPlan')}
                </Modal.Header>
                <Modal.Body>
                    {trips &&
                        trips.map((trip, index) => (
                            <div
                                key={trip.id}
                                className="flex mb-2 hover:bg-slate-50 p-2 cursor-pointer gap-4 h-[80px]"
                                onClick={() =>
                                    handleClickOnTripCard(
                                        trip.id,
                                        index
                                    )
                                }
                            >
                                <div className="w-[80px]">
                                    <img
                                        className="w-full h-full object-cover rounded-md"
                                        src={trip.image}
                                    />
                                </div>
                                <div className="flex-1 flex items-center">
                                    <div className="font-bold p-1">
                                        {trip.name}
                                    </div>
                                    {((type === HOTELTYPE &&
                                        trip.hotels.findIndex(
                                            hotel => hotel.id === id
                                        ) !== -1) ||
                                        (type === RESTAURANTTYPE &&
                                            trip.restaurants.findIndex(
                                                restaurant =>
                                                    restaurant.id ===
                                                    id
                                            ) !== -1) ||
                                        (type === DESTINATIONTYPE &&
                                            trip.destinationTravels.findIndex(
                                                destinationTravel =>
                                                    destinationTravel.id ===
                                                    id
                                            ) !== -1)) && (
                                        <svg
                                            width="30px"
                                            height="30px"
                                            viewBox="0 0 24 24"
                                            className=" hover:fill-red-500"
                                            fill="red"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="Interface / Heart_02">
                                                <path
                                                    id="Vector"
                                                    d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z"
                                                    stroke="red"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <div
                        className="flex mb-2 hover:bg-slate-50 p-2 cursor-pointer w-full"
                        onClick={handleCreateTrip}
                    >
                        <div className="w-[100px]">
                            <div className=" bg-slate-300 w-16 h-16 text-2xl font-bold flex items-center justify-center rounded-sm cursor-pointer">
                                <span>+</span>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center">
                            <div className="font-bold p-1">
                                {t('createNewTrip')}
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            <TripForm
                showModal={showModalCreate}
                onClose={onCloseModalCreate}
            />
        </>
    )
}

export default LikeToTrip
