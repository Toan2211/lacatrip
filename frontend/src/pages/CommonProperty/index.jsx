import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    amenitiesHotelSelector,
    getAmenitiesHotel,
    getProvinces,
    provincesSelector
} from './baseproperty'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectUser } from '@pages/Auth/auth.slice'
import { getAllTrip } from '@pages/TripList/trip.slice'
import { allTripsSelector } from '@pages/TripList/trip.slice'

function CommonProperty() {
    const dispatch = useDispatch()
    const profile = useSelector(selectUser)
    const provinces = useSelector(provincesSelector)
    const amenitiesHotel = useSelector(amenitiesHotelSelector)
    const trips = useSelector(allTripsSelector)
    const [firstTime, setFirsttime] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            if (provinces.length === 0)
                await dispatch(getProvinces()).then(res =>
                    unwrapResult(res)
                )
            if (amenitiesHotel.length === 0)
                await dispatch(getAmenitiesHotel())
            if (profile.id && firstTime) {
                dispatch(getAllTrip())
                setFirsttime(false)
            }
        }
        fetchData()
    }, [dispatch, provinces, amenitiesHotel, profile, trips, firstTime])
    return <></>
}

export default CommonProperty
