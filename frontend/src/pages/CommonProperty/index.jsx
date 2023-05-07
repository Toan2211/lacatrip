import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    amenitiesHotelSelector,
    getAmenitiesHotel,
    getProvinces,
    provincesSelector
} from './baseproperty'
import { unwrapResult } from '@reduxjs/toolkit'

function CommonProperty() {
    const dispatch = useDispatch()
    const provinces = useSelector(provincesSelector)
    const amenitiesHotel = useSelector(amenitiesHotelSelector)
    useEffect(() => {
        const fetchData = async () => {
            if (provinces.length === 0)
                await dispatch(getProvinces()).then(res =>
                    unwrapResult(res)
                )
            if (amenitiesHotel.length === 0)
                await dispatch(getAmenitiesHotel())
        }
        fetchData()
    }, [dispatch, provinces, amenitiesHotel])
    return <></>
}

export default CommonProperty
