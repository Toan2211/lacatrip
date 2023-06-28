import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import {
    getRestaurantsClient,
    restaurantsClientSelector
} from '@pages/RestaurantList/restaurantclient.slice'
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import {
    getHotelsClient,
    hotelsClientSelector
} from '@pages/HotelList/hotelclient.slice'
import {
    destinationsClientSelector,
    getDestinations
} from '@pages/DestinationTravelList/destinationclient.slice'
import LikeToTrip from '@page-components/LikeToTrip'
import {
    DESTINATIONTYPE,
    HOTELTYPE,
    RESTAURANTTYPE
} from '@constants/instanceType'

const Card = ({ data, type }) => {
    return (
        <div className="h-full">
            <div className="h-[220px] mb-1 relative">
                <img
                    src={data.images[0].url}
                    className="w-full h-full object-cover"
                />
                <LikeToTrip id={data.id} type={type} />
            </div>
            <Link className=" hover:underline font-semibold">
                {data.name}
            </Link>
            <div className="flex items-center h-5">
                {!!data.totalRating && (
                    <>
                        {Array.from(
                            Array(Math.floor(data.rating)).keys()
                        ).map(index => (
                            <span
                                key={index}
                                className="text-yellow-400"
                            >
                                <AiFillStar />
                            </span>
                        ))}
                        <div>{data.totalRating}</div>
                    </>
                )}
            </div>
            {type === HOTELTYPE && (
                <div className="font-semibold text-sm">
                    from ${data.cheapestPrice}/night
                </div>
            )}
            {type === RESTAURANTTYPE && (
                <div className="font-semibold text-sm">
                    from ${data.minPrice} to ${data.maxPrice}
                </div>
            )}
            {type === DESTINATIONTYPE && (
                <div className="font-semibold text-sm">
                    from ${data.price} per adult
                </div>
            )}
        </div>
    )
}
function DetailProvince() {
    const provinces = useSelector(provincesSelector)
    const [province, setProvince] = useState('')
    const restaurants = useSelector(restaurantsClientSelector)
    const hotels = useSelector(hotelsClientSelector)
    const destinations = useSelector(destinationsClientSelector)
    const dispatch = useDispatch()
    const provinceId = useParams().id
    useEffect(() => {
        const params = {
            provinceId: provinceId
        }
        const provinceInarr = provinces.find(
            province => province.id == provinceId
        )
        if (provinceInarr) {
            dispatch(getRestaurantsClient(params))
            setProvince(provinceInarr)
            dispatch(getHotelsClient(params))
            dispatch(getDestinations(params))
        }
    }, [provinceId, provinces, province, dispatch])
    return (
        <div className="max-w-[1535px] px-8 py-5 md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh]">
            <header className=" font-bold text-4xl mb-3">
                <span className=" text-5xl text-red-500">
                    Hãy khám phá{' '}
                </span>
                {province.name}
            </header>
            <div className="flex items-center h-[330px] pb-4 relative">
                <div className="w-full h-full">
                    <img
                        src={province.image}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div>
                <header className=" font-bold text-2xl mb-3">
                    Những điểm đến thú vị tại {province.name}
                </header>
                {destinations.length > 0 && (
                    <div className="flex gap-3 mb-10 lg:h-[300px] ">
                        <div className="flex flex-col w-1/4 gap-4">
                            <header className="font-semibold text-2xl">
                                Trải nghiệm
                            </header>
                            <div className=" text-sm">
                                Những địa điểm, cung đường tuyệt vời để lang thang và nhiều trải nghiệm đặc sắc tại {' '}
                                {province.name}
                            </div>
                            <Link
                                to={`/destination-travels/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                Xem thêm
                            </Link>
                        </div>
                        <div className="h-full lg:w-[75%]">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true
                                }}
                                modules={[Pagination]}
                            >
                                {destinations.map(destination => (
                                    <SwiperSlide key={destination.id}>
                                        <Card
                                            data={destination}
                                            type={DESTINATIONTYPE}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
                {hotels.length > 0 && (
                    <div className="flex  gap-3 mb-10 lg:h-[300px] ">
                        <div className="flex flex-col w-1/4 flex-grow gap-4">
                            <header className="font-semibold text-2xl">
                                Nghỉ dưỡng
                            </header>
                            <div className=" text-sm">
                                Với đầy đủ phong cách nghỉ dưỡng: Hiện đại, cổ điển, thơ mộng,...
                            </div>
                            <Link
                                to={`/hotels/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                Xem thêm
                            </Link>
                        </div>
                        <div className="h-full lg:w-[75%]">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true
                                }}
                                modules={[Pagination]}
                            >
                                {hotels.map(hotel => (
                                    <SwiperSlide key={hotel.id}>
                                        <Card
                                            data={hotel}
                                            type={HOTELTYPE}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
                {restaurants.length > 0 && (
                    <div className="flex gap-3 mb-10 lg:h-[300px]">
                        <div className="flex flex-col w-1/4 flex-grow gap-4">
                            <header className="font-semibold text-2xl">
                                Ăn uống
                            </header>
                            <div className=" text-sm">
                                {
                                    'Không thể bỏ lỡ những đồ ăn, thức uống tuyệt vời nơi đây.'
                                }
                            </div>
                            <Link
                                to={`/restaurants/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                Xem thêm
                            </Link>
                        </div>
                        <div className="h-full lg:w-[75%]">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true
                                }}
                                modules={[Pagination]}
                            >
                                {restaurants.map(restaurant => (
                                    <SwiperSlide key={restaurant.id}>
                                        <Card
                                            data={restaurant}
                                            type={RESTAURANTTYPE}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetailProvince
