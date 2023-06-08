import GoogleMap from '@components/GoogleMap'
import { Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { BiCalendar } from 'react-icons/bi'
import TripOrganize from './TripOrganize'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentTripSelector,
    getTripDetail,
    setCurrentTrip,
    updateTrip
} from '../trip.slice'
import { NavLink, useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
import LoadingPage from '@components/LoadingPage'
import InviteTripForm from './InviteTripForm'
import { toast } from 'react-toastify'
import { socketSelector } from '@pages/Chat/socket.slice'
import Chat from '@pages/Chat'
import { setCurrentOnline } from '@pages/Chat/message.slice'
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
const ItemCard = ({ data, link, onClick }) => {
    return (
        <li className="flex flex-col border-[1px] border-slate-300 rounded-2xl overflow-hidden shadow-xl mb-3">
            <div className="w-full h-[200px]" onClick={() => onClick(data.longtitude, data.latitude)}>
                <img
                    src={data.images[0].url}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
            <div className="p-3">
                <NavLink
                    to={link}
                    className="font-semibold text-lg mb-2 hover:text-blue-500"
                >
                    {data.name}
                </NavLink>
                <div>{data.address}</div>
            </div>
        </li>
    )
}
function TripId() {
    const dispatch = useDispatch()
    const socket = useSelector(socketSelector)
    const currentTrip = useSelector(currentTripSelector)
    const id = useParams().id
    const [nameTrip, setNameTrip] = useState('')
    const [tripdescription, setTripdescription] = useState('')
    const [markers, setMarkers] = useState([])
    const handleOnchangeDescription = e =>
        setTripdescription(e.target.value)
    const onNameTripBlur = async () => {
        try {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('name', nameTrip)
            await dispatch(updateTrip(formData)).then(res =>
                unwrapResult(res)
            )
        } catch (error) {
            setNameTrip(currentTrip.name)
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const handleOnBlurDescription = async () => {
        try {
            if (
                !(
                    tripdescription === '' &&
                    currentTrip.description === null
                )
            ) {
                const formData = new FormData()
                formData.append('id', id)
                formData.append('description', tripdescription)
                await dispatch(updateTrip(formData)).then(res =>
                    unwrapResult(res)
                )
            }
        } catch (error) {
            setTripdescription(currentTrip.description)
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const [showModal, setShowModal] = useState(false)
    const onClose = () => setShowModal(false)
    const [isOpen, setIsOpen] = useState(false)
    const onCloseDrawer = () => setIsOpen(false)
    const onChangeNameTrip = e => setNameTrip(e.target.value)
    useEffect(() => {
        if (id && id !== currentTrip.id)
            dispatch(getTripDetail(id)).then(res => unwrapResult(res))
        if (!_.isEmpty(currentTrip)) {
            setNameTrip(currentTrip.name)
            setTripdescription(currentTrip.description)
            const markersHotel = currentTrip.hotels.map(hotel => ({
                id: hotel.id,
                name: hotel.name,
                position: {
                    lat: hotel.latitude,
                    lng: hotel.longtitude
                }
            }))
            const markersRes = currentTrip.restaurants.map(
                restaurant => ({
                    id: restaurant.id,
                    name: restaurant.name,
                    position: {
                        lat: restaurant.latitude,
                        lng: restaurant.longtitude
                    }
                })
            )
            const markersDes = currentTrip.destinationTravels.map(
                destinationTravel => ({
                    id: destinationTravel.id,
                    name: destinationTravel.name,
                    position: {
                        lat: destinationTravel.latitude,
                        lng: destinationTravel.longtitude
                    }
                })
            )
            setMarkers([
                ...markersHotel,
                ...markersRes,
                ...markersDes
            ])
            if (socket && currentTrip.id) {
                socket.emit('joinRoom', currentTrip.id)
            }
        }
    }, [id, dispatch, currentTrip, socket])
    useEffect(() => {
        return () => {
            dispatch(setCurrentTrip({}))
        }
    }, [dispatch])
    useEffect(() => {
        return () => {
            if (socket && currentTrip.id) {
                socket.emit('leaveRoom', currentTrip.id)
                dispatch(setCurrentOnline([]))
            }
        }
    }, [currentTrip, socket, dispatch])
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState(null)
    const [previewSource, setPreviewSource] = useState('')
    const handleChangeImg = async e => {
        const file = e.target.files[0]
        if (file) setImage(file)
        previewFile(file)
        const formData = new FormData()
        formData.append('id', id)
        formData.append('image', file)
        await dispatch(updateTrip(formData)).then(res => {
            unwrapResult(res)
            if (res.payload.status == 200) {
                dispatch(
                    setCurrentTrip({
                        ...currentTrip,
                        image: res.payload.data.image
                    })
                )
            }
        })
    }
    const previewFile = file => {
        if (!file) return
        const reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const [center, setCenter] = useState({
        lat: 16.0667,
        lng: 108.225
    })
    const handleChangeCenterMap = (longtitude, latitude) => {
        setCenter({
            lat: latitude,
            lng: longtitude
        })
    }
    if (!Object.keys(currentTrip).length) return <LoadingPage />
    return (
        <>
            <div className="max-w-[1535px] flex min-h-[200vh]">
                <div className="w-full lg:basis-1/3 shadow-lg">
                    <div className="relative flex flex-col items-center">
                        <div className="w-full h-[240px] relative">
                            <img
                                src={
                                    previewSource || currentTrip.image
                                }
                                className="w-full h-full object-cover"
                            />
                            <label className="z-10 absolute top-0 right-3 font-bold text-2xl cursor-pointer">
                                <input
                                    type="file"
                                    accept=".jpg, .svg, .png"
                                    className=" hidden"
                                    onChange={handleChangeImg}
                                />
                                <Tooltip
                                    content="Update thumbnail trip"
                                    style="light"
                                >
                                    ...
                                </Tooltip>
                            </label>
                        </div>
                        <div className="lg:w-[80%] bg-slate-50 h-[140px] shadow-xl rounded-xl p-4 absolute top-[180px] w-[80%]">
                            <div className="flex items-center">
                                <input
                                    className="font-bold text-2xl focus:outline-none focus:ring ease-linear transition-all duration-150 rounded-md px-1"
                                    onBlur={onNameTripBlur}
                                    value={nameTrip}
                                    onChange={onChangeNameTrip}
                                />
                                <span
                                    className="flex-end ml-4 cursor-pointer"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <Tooltip
                                        content="Edit trip"
                                        style="light"
                                    >
                                        <AiFillSetting />
                                    </Tooltip>
                                </span>
                            </div>

                            <div className="text-sm ml-2">
                                By {currentTrip.user.firstname}{' '}
                                {currentTrip.user.lastname}
                            </div>
                            <div className="flex justify-between mt-5 overflow-hidden">
                                <div className="flex gap-2 items-center flex-1 w-[50%]">
                                    {currentTrip.startDate && (
                                        <>
                                            <span>
                                                <BiCalendar />
                                            </span>
                                            <span className="text-sm font-semibold">
                                                {
                                                    currentTrip.startDate.split(
                                                        'T'
                                                    )[0]
                                                }
                                            </span>
                                            <span>-</span>
                                            <span className="text-sm font-semibold">
                                                {
                                                    currentTrip.endDate.split(
                                                        'T'
                                                    )[0]
                                                }
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-5 items-center">
                                    <div className="flex -space-x-4">
                                        {currentTrip.members.map(
                                            member => (
                                                <Tooltip
                                                    content={`${member.firstname} ${member.lastname}`}
                                                    style="light"
                                                    key={member.id}
                                                    className="cursor-pointer"
                                                >
                                                    <img
                                                        key={
                                                            member.id
                                                        }
                                                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                                        src={
                                                            member.avatar ||
                                                            'https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG'
                                                        }
                                                        alt=""
                                                    />
                                                </Tooltip>
                                            )
                                        )}
                                    </div>
                                    <Tooltip
                                        content="Add Tripmate"
                                        style="light"
                                    >
                                        <span
                                            className="block w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                                setShowModal(true)
                                            }
                                        >
                                            <svg
                                                width="20px"
                                                height="20px"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="user-plus"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 640 512"
                                                color="#6c757d"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                                                ></path>
                                            </svg>
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="h-[140px] bg-slate-100 w-full"></div>
                    </div>
                    <div className="px-10 lg:px-10 mt-3">
                        <div>
                            <header className="font-bold text-xl mb-2">
                                Notes
                            </header>
                            <textarea
                                className="w-full border border-gray-300 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 resize-none"
                                value={tripdescription}
                                onChange={handleOnchangeDescription}
                                onBlur={handleOnBlurDescription}
                            ></textarea>
                        </div>
                        {currentTrip.tripDates.length > 0 && (
                            <div>
                                <header className="font-bold text-xl mb-2">
                                    Itinerary
                                </header>
                                {currentTrip.tripDates &&
                                    currentTrip.tripDates.map(
                                        (tripDate, index) => (
                                            <div key={index}>
                                                <header className=" font-semibold p-2 bg-slate-200 my-2 rounded-lg">
                                                    {new Date(
                                                        tripDate.date
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        options
                                                    )}
                                                </header>
                                                <ul>
                                                    {tripDate.hotels.map(
                                                        hotel => (
                                                            <ItemCard
                                                                key={
                                                                    hotel.id
                                                                }
                                                                data={
                                                                    hotel
                                                                }
                                                                link={`/hotel/${hotel.id}`}
                                                                onClick = {handleChangeCenterMap}
                                                            />
                                                        )
                                                    )}
                                                    {tripDate.restaurants &&
                                                        tripDate.restaurants.map(
                                                            restaurant => (
                                                                <ItemCard
                                                                    key={
                                                                        restaurant.id
                                                                    }
                                                                    data={
                                                                        restaurant
                                                                    }
                                                                    link={`/restaurant/${restaurant.id}`}
                                                                    onClick = {handleChangeCenterMap}
                                                                />
                                                            )
                                                        )}
                                                    {tripDate.destinationTravels.map(
                                                        destinationTravel => (
                                                            <ItemCard
                                                                key={
                                                                    destinationTravel.id
                                                                }
                                                                data={
                                                                    destinationTravel
                                                                }
                                                                link={`/destination-travel/${destinationTravel.id}`}
                                                                onClick = {handleChangeCenterMap}
                                                            />
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    )}
                            </div>
                        )}
                        <div className="mt-5">
                            <header className="font-bold text-xl mb-2">
                                All Item
                            </header>
                            {currentTrip.hotels.length > 0 && (
                                <div>
                                    <header className="w-full px-3 py-2 font-semibold">
                                        Hotels
                                    </header>
                                    <ul>
                                        {currentTrip.hotels.map(
                                            hotel => (
                                                <ItemCard
                                                    key={hotel.id}
                                                    data={hotel}
                                                    link={`/hotel/${hotel.id}`}
                                                    onClick = {handleChangeCenterMap}
                                                />
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {currentTrip.restaurants.length > 0 && (
                                <div>
                                    <header className="w-full bg-slate-50 px-3 py-2 font-semibold">
                                        Restaurants
                                    </header>
                                    <ul>
                                        {currentTrip.restaurants.map(
                                            restaurant => (
                                                <ItemCard
                                                    key={
                                                        restaurant.id
                                                    }
                                                    data={restaurant}
                                                    link={`/restaurant/${restaurant.id}`}
                                                    onClick = {handleChangeCenterMap}
                                                />
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                            {currentTrip.destinationTravels.length >
                                0 && (
                                <div>
                                    <header className="w-full bg-slate-50 px-3 py-2 font-semibold">
                                        Destination Travels
                                    </header>
                                    <ul>
                                        {currentTrip.destinationTravels.map(
                                            destinationTravel => (
                                                <ItemCard
                                                    key={
                                                        destinationTravel.id
                                                    }
                                                    data={
                                                        destinationTravel
                                                    }
                                                    link={`/destination-travel/${destinationTravel.id}`}
                                                    onClick = {handleChangeCenterMap}
                                                />
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="lg:basis-1/3 lg:h-[100vh] hidden lg:fixed lg:w-[66%] lg:right-0 lg:flex">
                    <div className="flex-1 w-full">
                        <GoogleMap
                            center={center}
                            markers={markers}
                        />
                    </div>
                    {currentTrip.members.length > 1 && (
                        <div className="flex-1 lg:h-[90vh] shadow-lg">
                            <Chat />
                        </div>
                    )}
                </div>
            </div>
            <InviteTripForm
                showModal={showModal}
                onClose={onClose}
                tripId={currentTrip.id}
            />
            <TripOrganize onClose={onCloseDrawer} isOpen={isOpen} />
        </>
    )
}

export default TripId
