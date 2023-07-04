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
import { useTranslation } from 'react-i18next'
import { formatMoney } from '@utils/formatMoney'

const Card = ({ data, type }) => {
    const { t } = useTranslation()
    return (
        <div className="h-full">
            <div className="h-[220px] mb-1 relative">
                <img
                    src={data.images[0].url}
                    className="w-full h-full object-cover"
                />
                <LikeToTrip id={data.id} type={type} />
            </div>
            {type === HOTELTYPE && (
                <Link to={`/hotel/${data.id}`} className=" hover:underline font-semibold">
                    {data.name}
                </Link>
            )}
            {type === RESTAURANTTYPE && (
                <Link to={`/restaurant/${data.id}`} className=" hover:underline font-semibold">
                    {data.name}
                </Link>
            )}
            {type === DESTINATIONTYPE && (
                <Link to={`/destination-travel/${data.id}`} className=" hover:underline font-semibold">
                    {data.name}
                </Link>
            )}

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
                    {t('from')} {formatMoney(data.cheapestPrice, t('moneyType'))}/{t('night')}
                </div>
            )}
            {type === RESTAURANTTYPE && (
                <div className="font-semibold text-sm">
                    {t('from')} {formatMoney(data.minPrice, t('moneyType'))} {t('to')} {formatMoney(data.maxPrice, t('moneyType'))}
                </div>
            )}
            {type === DESTINATIONTYPE && (
                <div className="font-semibold text-sm">
                    {t('from')} {formatMoney(data.price, t('moneyType'))} / {t('people')}
                </div>
            )}
        </div>
    )
}
function DetailProvince() {
    const { t } = useTranslation()
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
                    {t('explore')}{' '}
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
                    {t('esstential')} {province.name}
                </header>
                {destinations.length > 0 && (
                    <div className="flex gap-3 mb-10 lg:h-[300px] ">
                        <div className="flex flex-col w-1/4 gap-4">
                            <header className="font-semibold text-2xl">
                                {t('do')}
                            </header>
                            <div className=" text-sm">
                                {t('doDescription')} {province.name}
                            </div>
                            <Link
                                to={`/destination-travels/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                {t('seeAll')}
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
                                {t('stay')}
                            </header>
                            <div className=" text-sm">
                                {t('stayDescription')}
                            </div>
                            <Link
                                to={`/hotels/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                {t('seeAll')}
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
                                {t('eat')}
                            </header>
                            <div className=" text-sm">
                                {
                                    'Cant-miss spots to dine, drink, and feast.'
                                }
                            </div>
                            <Link
                                to={`/restaurants/province/${province.id}`}
                                className=" underline text-sm font-semibold"
                            >
                                {t('seeAll')}
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
