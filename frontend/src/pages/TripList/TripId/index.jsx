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
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
const ItemCard = ({ data, link }) => {
    return (
        <li className="flex flex-col border-[1px] border-slate-300 rounded-2xl overflow-hidden shadow-xl mb-3">
            <div className="w-full h-[200px]">
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
    const currentTrip = useSelector(currentTripSelector)
    const id = useParams().id
    const [nameTrip, setNameTrip] = useState('')
    const [tripdescription, setTripdescription] = useState('')
    const handleOnchangeDescription = e =>
        setTripdescription(e.target.value)
    const onNameTripBlur = () => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', nameTrip)
        dispatch(updateTrip(formData)).then(res => unwrapResult(res))
    }
    const handleOnBlurDescription = () => {
        if (
            !(
                tripdescription === '' &&
                currentTrip.description === null
            )
        ) {
            const formData = new FormData()
            formData.append('id', id)
            formData.append('description', tripdescription)
            dispatch(updateTrip(formData)).then(res =>
                unwrapResult(res)
            )
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
        }
    }, [id, dispatch, currentTrip])
    useEffect(() => {
        return () => {
            dispatch(setCurrentTrip({}))
        }
    }, [dispatch])
    if (!Object.keys(currentTrip).length) return <LoadingPage />
    return (
        <>
            <div className="max-w-[1535px] flex min-h-[200vh]">
                <div className="w-full lg:basis-1/3 shadow-lg">
                    <div className="relative flex flex-col items-center">
                        <div className="w-full h-[240px]">
                            <img
                                src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG"
                                className="w-full h-full object-cover"
                            />
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
                                <div className="flex gap-5 items-center basis-7">
                                    <span className="block w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src={
                                                currentTrip.user
                                                    .avatar ||
                                                'https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG'
                                            }
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </span>
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
                                                />
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="basis-2/3 lg:h-[100vh] hidden lg:block lg:fixed w-[66%] right-0">
                    {/* <GoogleMap
                    center={{
                        lat: 16.0667,
                        lng: 108.225
                    }}
                /> */}
                </div>
            </div>
            <InviteTripForm showModal={showModal} onClose={onClose} tripId={currentTrip.id}/>
            <TripOrganize onClose={onCloseDrawer} isOpen={isOpen} />
        </>
    )
}

export default TripId
