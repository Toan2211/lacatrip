import LikeToTrip from '@page-components/LikeToTrip'
import {
    DESTINATIONTYPE,
    HOTELTYPE,
    RESTAURANTTYPE
} from '@constants/instanceType'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

function ItemListInstance({ item, type }) {
    const [link, setLink] = useState('')
    useEffect(() => {
        if (type === DESTINATIONTYPE) {
            setLink(`/destination-travel/${item.id}`)
        }
        else if (type === HOTELTYPE) {
            setLink(`/hotel/${item.id}`)
        }
        else if (type === RESTAURANTTYPE) {
            setLink(`/restaurant/${item.id}`)
        }
    }, [type, item])
    return (
        <div className="w-full flex gap-4 overflow-hidden h-[250px]">
            <div className="w-[300px] h-[250px] overflow-hidden relative">
                <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {item.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.url}
                                className="w-full h-[220px] object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <LikeToTrip id={item.id} type={type} />
            </div>
            <div className="flex-1">
                <Link
                    to={link}
                    className=" hover:underline font-semibold"
                >
                    {item.name}
                </Link>
                {item?.corpTour?.name && (
                    <div>By {item?.corpTour?.name}</div>
                )}
                <div className="flex mt-3">
                    <div className="flex-1 line-clamp-4 text-sm text-gray-500 h-[80px] overflow-hidden">
                        {item.description}
                    </div>
                    <div className="w-1/3 flex flex-col justify-center items-center">
                        <div className=" flex items-center justify-center">
                            <div>
                                <div className="text-sm text-gray-500">
                                    from
                                </div>

                                {type === DESTINATIONTYPE && (
                                    <>
                                        <div className=" font-semibold text-xl">
                                            ${item.price}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            per adult
                                        </div>
                                    </>
                                )}
                                {type === HOTELTYPE && (
                                    <>
                                        <div className=" font-semibold text-xl">
                                            ${item.cheapestPrice}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            per room
                                        </div>
                                    </>
                                )}
                                {type === RESTAURANTTYPE && (
                                    <>
                                        <div className=" font-semibold text-xl">
                                            ${item.minPrice}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            to
                                        </div>
                                        <div className=" font-semibold text-xl">
                                            ${item.maxPrice}
                                        </div>
                                        <div className=" text-sm text-gray-500">
                                            per dish
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mt-2">
                            <Link
                                to={link}
                                className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-[100px] ease-linear transition-all duration-150"
                            >
                                Detail
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemListInstance
