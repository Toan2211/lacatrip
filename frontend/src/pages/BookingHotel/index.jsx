import {
    currentHotelClientSelector,
    getDeailHotelClient
} from '@pages/HotelList/hotelclient.slice'
import queryString from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Autoplay, Pagination } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import { getRoomClient } from '@pages/HotelList/hotelclient.slice'
import _ from 'lodash'
import { currentRoomClientSelector } from '@pages/HotelList/hotelclient.slice'
import { createBookingHotel } from './bookinghotelclient.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getLengthDay } from '@utils/getDates'

function BookingHotel() {
    const location = useLocation()
    const dispatch = useDispatch()
    const currentHotel = useSelector(currentHotelClientSelector)
    const currentRoom = useSelector(currentRoomClientSelector)
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            checkIn: params.checkIn,
            checkOut: params.checkOut,
            countRooms: Number.parseInt(params.countRooms),
            countAdults: Number.parseInt(params.countAdults),
            countChildrens: Number.parseInt(params.countChildrens),
            hotelId: params.hotelId,
            roomId: params.roomId,
            roomDetailIds: params.roomDetailIds || ''
        }
    }, [location.search])
    useEffect(() => {
        dispatch(getDeailHotelClient(queryParams.hotelId))
        dispatch(getRoomClient(queryParams.roomId))
    }, [queryParams, dispatch])
    const handleBookingHotel = async () => {
        try {
            const roomDetailIds = []
            const roomDetailIdsParams =
                queryParams.roomDetailIds.split(',')
            for (let i = 1; i <= queryParams.countRooms; i = i + 1)
                roomDetailIds.push(roomDetailIdsParams[i])
            const dataBooking = {
                checkIn: queryParams.checkIn,
                checkOut: queryParams.checkOut,
                countRooms: Number.parseInt(queryParams.countRooms),
                countAdults: Number.parseInt(queryParams.countAdults),
                countChildrens: Number.parseInt(
                    queryParams.countChildrens
                ),
                hotelId: queryParams.hotelId,
                roomTypeId: queryParams.roomId,
                roomDetailIds: roomDetailIds,
                serviceManagerId: currentHotel.serviceManagerId,
                amount:
                    currentRoom.price *
                    Number.parseInt(queryParams.countRooms) *
                    getLengthDay(queryParams.checkIn, queryParams.checkOut)
            }
            await dispatch(createBookingHotel(dataBooking)).then(
                res => {
                    const data = unwrapResult(res)
                    window.location.replace(data.linkPayment)
                }
            )
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        document.title = 'Booking Hotel'
    }, [])
    if (_.isEmpty(currentHotel) || _.isEmpty(currentRoom))
        return <div>Loading...</div>
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 pb-[100px] bg-slate-50">
            <div className="w-[40%] mx-auto bg-white">
                <header className=" font-bold text-2xl pb-5 bg-slate-50">
                    Your booking
                </header>
                <div className="px-5 py-8 border rounded-md border-gray-300 shadow-md">
                    <div className=" border-b border-slate-300 pb-5">
                        <div className="flex gap-5 mb-2">
                            <div className="w-[180px] h-[140px] overflow-hidden relative rounded">
                                <Swiper
                                    pagination={true}
                                    modules={[Pagination, Autoplay]}
                                    className="mySwiper"
                                    effect={'fade'}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false
                                    }}
                                >
                                    {currentHotel.images.map(
                                        (img, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    src={img.url}
                                                    className="w-full h-[220px] object-cover rounded"
                                                />
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            </div>
                            <div>
                                <div className=" font-semibold text-xl">
                                    {currentHotel.name}
                                </div>
                                <div className="flex gap-3 items-center">
                                    <span>
                                        <IoLocationOutline />
                                    </span>
                                    <span className=" text-gray-500">
                                        {currentHotel.province.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Room type
                            </div>
                            <div>{currentRoom.title}</div>
                        </div>
                    </div>
                    <div className="mt-5 border-b border-slate-300 pb-5">
                        <div className=" font-bold text-xl">
                            Your trip
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Date
                            </div>
                            <div className='font-semibold'>
                                {queryParams.checkIn} to {' '}
                                {queryParams.checkOut}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Adults
                            </div>
                            <div>{queryParams.countAdults}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Childrens
                            </div>
                            <div>{queryParams.countChildrens}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Room
                            </div>
                            <div>{queryParams.countRooms}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className=" font-semibold text-xl">
                            Price
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Price per night
                            </div>
                            <div className="font-bold text-lg">
                                {currentRoom.price}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Night
                            </div>
                            <div className="font-bold text-lg">
                                {getLengthDay(queryParams.checkIn, queryParams.checkOut)}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Total Price
                            </div>
                            <div className="font-bold text-lg">
                                $
                                {currentRoom.price *
                                    Number.parseInt(
                                        queryParams.countRooms
                                    )
                                    * getLengthDay(queryParams.checkIn, queryParams.checkOut)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 mt-5 justify-center">
                        <button
                            onClick={() => handleBookingHotel()}
                            className="w-[40%] bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        >
                            Banking Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingHotel
