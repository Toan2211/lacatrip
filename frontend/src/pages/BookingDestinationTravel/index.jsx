import {
    currentDestinationClientSelector,
    getDetailDestination
} from '@pages/DestinationTravelList/destinationclient.slice'
import _ from 'lodash'
import queryString from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Autoplay, Pagination } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
import { createBookingDestinationTravel } from './bookingdestinationtravel.slice'
import { unwrapResult } from '@reduxjs/toolkit'

function BookingDestinationTravel() {
    const location = useLocation()
    const dispatch = useDispatch()
    const currentDestiantionTravel = useSelector(
        currentDestinationClientSelector
    )
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            date: params.date,
            countPeople: Number.parseInt(params.countPeople),
            destinationTravelId: params.destinationTravelId
        }
    }, [location.search])
    const handleBooking = async () => {
        try {
            const dataBooking = {
                date: queryParams.date,
                countPeople: queryParams.countPeople,
                destinationTravelId: queryParams.destinationTravelId,
                amount:
                    currentDestiantionTravel.price *
                    Number.parseInt(queryParams.countPeople),
                serviceManagerId:
                    currentDestiantionTravel.serviceManagerId
            }
            await dispatch(createBookingDestinationTravel(dataBooking)).then(
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
        dispatch(
            getDetailDestination(queryParams.destinationTravelId)
        )
    }, [queryParams, dispatch])
    useEffect(() => {
        document.title = 'Đặt vé địa điểm du lịch'
    }, [])
    if (_.isEmpty(currentDestiantionTravel))
        return <div>Loading...</div>
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 pb-[100px] bg-slate-50">
            <div className="w-[40%] mx-auto bg-white">
                <header className=" font-bold text-2xl pb-5 bg-slate-50">
                    Đơn đặt lịch của bạn
                </header>
                <div className="px-5 py-8 border rounded-md border-gray-300 shadow-md">
                    <div className=" border-b border-slate-300 pb-5">
                        <div className="flex gap-5 mb-2">
                            <div className="w-[220px] h-[140px] overflow-hidden relative rounded">
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
                                    {currentDestiantionTravel.images.map(
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
                                    {currentDestiantionTravel.name}
                                </div>
                                <div className="flex gap-3 items-center">
                                    <span>
                                        <IoLocationOutline />
                                    </span>
                                    <span className=" text-gray-500">
                                        {
                                            currentDestiantionTravel
                                                .province.name
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 border-b border-slate-300 pb-5">
                        <div className=" font-bold text-xl">
                            Lịch trình
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Ngày
                            </div>
                            <div className="font-semibold">
                                {queryParams.date}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Số người
                            </div>
                            <div>{queryParams.countPeople}</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className=" font-semibold text-xl">
                            Giá
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Giá/đêm
                            </div>
                            <div className="font-bold text-lg">
                                {currentDestiantionTravel.price}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className=" text-gray-500 text-lg">
                                Tổng tiền
                            </div>
                            <div className="font-bold text-lg">
                                $
                                {currentDestiantionTravel.price *
                                    Number.parseInt(
                                        queryParams.countPeople
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-10 mt-5 justify-center">
                        <button
                            onClick={() => handleBooking()}
                            className="w-[40%] bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDestinationTravel
