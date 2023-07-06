import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    currentHotelClientSelector,
    getDeailHotelClient,
    getRoomAvailableSelector
} from '../hotelclient.slice'
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import LoadingPage from '@components/LoadingPage'
import { AiFillStar } from 'react-icons/ai'
import GoogleMap from '@components/GoogleMap'
import RoomCard from './RoomCard'
import LikeAndShare from '@components/LikeAndShare'
import Comment from '@pages/Comment'
import SearchForm from './SearchForm'
import { useTranslation } from 'react-i18next'
import { HOTELTYPE } from '@constants/instanceType'

function HotelId() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const id = useParams().id
    const currentHotel = useSelector(currentHotelClientSelector)
    const roomAvailable = useSelector(getRoomAvailableSelector)
    const [thumbsSwiper, setThumbsSwiper] = useState()
    useEffect(() => {
        if (id) dispatch(getDeailHotelClient(id))
    }, [id, dispatch])
    useEffect(() => {
        document.title = currentHotel.name
    }, [currentHotel])
    if (!Object.keys(currentHotel).length) return <LoadingPage />
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px]">
            <div className="flex justify-end mr-[14%]">
                <LikeAndShare id={currentHotel.id} type={HOTELTYPE} />
            </div>
            <div className=" ml-[12%]">
                <div className="font-semibold text-2xl">
                    {currentHotel.name}
                </div>
                <div className=" text-yellow-400 flex gap-1">
                    {currentHotel.hotelClass &&
                        Array.from(
                            Array(currentHotel.hotelClass)
                        ).map(index => (
                            <span key={index}>
                                <AiFillStar />
                            </span>
                        ))}
                </div>
                <div className="flex">
                    <span className="w-6 h-10 text-center">
                        <svg
                            viewBox="0 0 24 24"
                            width="20px"
                            height="20px"
                        >
                            <path d="M12 2C7.745 2 4.27 5.475 4.27 9.73c0 4.539 4.539 9.056 6.971 11.486L12 22l.759-.761c2.433-2.453 6.972-6.97 6.972-11.509C19.73 5.475 16.256 2 12 2zm0 10.986c-1.93 0-3.5-1.569-3.5-3.5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.931-1.57 3.5-3.5 3.5z"></path>
                        </svg>
                    </span>
                    <span className="text-sm">
                        {currentHotel.address}
                    </span>
                </div>
            </div>
            <div className="w-full lg:w-[80%] bg-white lg:px-10 lg:pb-10 p-4 mx-auto">
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    effect={'fade'}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null
                    }}
                    modules={[
                        // Navigation,
                        Thumbs,
                        EffectFade,
                        Autoplay
                    ]}
                    // navigation={true}
                    grabCursor={true}
                    pagination={{
                        clickable: true
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                >
                    {currentHotel.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.url}
                                className="w-full object-cover lg:h-[60vh] h-[300px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {currentHotel.images.length > 4 && (
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={6}
                        slidesPerView={4}
                        watchSlidesProgress={true}
                        modules={[EffectFade, Navigation, Thumbs]}
                        grabCursor={true}
                        freeMode={true}
                        className="mt-2"
                    >
                        {currentHotel.images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img.url}
                                    className="hover:opacity-70 h-[120px] object-cover lg:w-[250px]"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            <div className="flex mt-2 gap-4 lg:flex-row w-full flex-col">
                <div className="flex-1">
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            {t('descriptionHotel')}
                        </header>
                        <span>
                            {i18n.language === 'vn' &&
                            currentHotel.descriptionVN
                                ? currentHotel.descriptionVN
                                : currentHotel.description}
                        </span>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            {t('amenities')}
                        </header>
                        <ul className="grid gap-1 grid-cols-2 lg:grid-cols-3">
                            {currentHotel.amenitieshotel.map(item => (
                                <li
                                    key={item.id}
                                    className="flex gap-2 items-center"
                                >
                                    <span>
                                        <img src={item.image} />
                                    </span>
                                    <span>
                                        {i18n.language === 'vn'
                                            ? item.name.split('-')[1]
                                            : item.name.split('-')[0]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            {t('hotelStyle')}
                        </header>
                        <ul className="flex flex-col">
                            {currentHotel.hotelStyle
                                .split(',')
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className="flex gap-2 items-center"
                                    >
                                        <span>
                                            {i18n.language === 'vn'
                                                ? item.split('-')[1]
                                                : item.split('-')[0]}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            {t('detailRoom')}
                        </header>
                        <div className="flex flex-col gap-5">
                            {roomAvailable &&
                                roomAvailable.map(room => (
                                    <RoomCard
                                        key={room.id}
                                        data={room}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div>
                    <SearchForm />
                    <div className="h-[300px] mt-4">
                        <GoogleMap
                            center={{
                                lat: currentHotel.latitude,
                                lng: currentHotel.longtitude
                            }}
                            markers={[
                                {
                                    id: currentHotel.id,
                                    name: currentHotel.name,
                                    position: {
                                        lat: currentHotel.latitude,
                                        lng: currentHotel.longtitude
                                    }
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <Comment
                rating={currentHotel.rating}
                totalRating={currentHotel.totalRating}
            />
        </div>
    )
}

export default HotelId
