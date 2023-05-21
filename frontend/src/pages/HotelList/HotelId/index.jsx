import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    currentHotelClientSelector,
    getDeailHotelClient
} from '../hotelclient.slice'
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import LoadingPage from '@components/LoadingPage'
import Mybutton from '@components/MyButton'
import { AiFillStar } from 'react-icons/ai'
import GoogleMap from '@components/GoogleMap'
import RoomCard from './RoomCard'
import CommentCard from '@components/CommentCard'

function HotelId() {
    const dispatch = useDispatch()
    const id = useParams().id
    const currentHotel = useSelector(currentHotelClientSelector)
    const [thumbsSwiper, setThumbsSwiper] = useState()
    useEffect(() => {
        if (id) dispatch(getDeailHotelClient(id))
    }, [id, dispatch])
    if (!Object.keys(currentHotel).length) return <LoadingPage />
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px]">
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
            <div className="w-full lg:w-[80%] bg-white lg:p-10 p-4 mx-auto">
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
                            About this hotel
                        </header>
                        <span>{currentHotel.description}</span>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            Property amenities
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
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            Hotel Style
                        </header>
                        <ul className="flex flex-col">
                            {currentHotel.hotelStyle
                                .split(',')
                                .map(item => (
                                    <li
                                        key={item.id}
                                        className="flex gap-2 items-center"
                                    >
                                        <span>{item}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="border-t-2 border-slate-200 my-4"></div>
                    <div>
                        <header className="font-semibold text-xl mb-3">
                            Availability
                        </header>
                        <div className="flex flex-col gap-5">
                            <RoomCard />
                            <RoomCard />
                            <RoomCard />
                            <RoomCard />
                            <RoomCard />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="lg:mt-2">
                        <div className=" border-gray-100 shadow-md border-1 lg:w-[30vw] w-full h-[50vh] border-[1px] px-5 py-10 rounded-2xl">
                            <div className="px-4 pb-4 flex justify-between items-center">
                                <div className="mt-4">
                                    <span className="font-normal text-gray-400">
                                        From:
                                    </span>
                                    <span className="font-bold text-xl">
                                        ${currentHotel.cheapestPrice}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className=" text-yellow-400 flex gap-1">
                                        <span>
                                            <AiFillStar />
                                        </span>
                                    </div>
                                    <span className="font-normal text-gray-400">
                                        {currentHotel.rating}{' '}
                                    </span>
                                    <span className="font-normal text-gray-400">
                                        ({currentHotel.totalRating}{' '}
                                        Reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="border-gray-100 border-[1px] rounded-2xl w-full overflow-hidden">
                                <div className="border-gray-100 border-[1px] w-full px-4 py-2 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className=" font-medium text-md">
                                            Date
                                        </span>
                                        <span className="text-sm">
                                            17/5/2023
                                        </span>
                                    </div>
                                    <div>
                                        <button className="bg-gray-300 text-gray-700 rounded inline-flex items-center">
                                            <svg
                                                className="fill-current h-4 w-4  transition-transform"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="border-gray-100 border-[1px] w-full px-4 py-2 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className=" font-medium text-md">
                                            People
                                        </span>
                                        <span className="text-sm">
                                            5
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className=" px-2 py-1 border-[1px] border-black rounded-full font-bold cursor-pointer">
                                            -
                                        </span>
                                        <span className=" px-2 py-1 border-[1px] border-black rounded-full font-bold cursor-pointer">
                                            5
                                        </span>
                                        <span className=" px-2 py-1 border-[1px] border-black rounded-full font-bold cursor-pointer">
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center font-semibold text-2xl mt-5">
                                <span>Total</span>
                                <span>$500</span>
                            </div>
                            <div className="text-center mt-4">
                                <Mybutton className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-3/4 ease-linear transition-all duration-150">
                                    Book Now
                                </Mybutton>
                            </div>
                        </div>
                    </div>
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
            <div className="mt-20">
                <header className="font-semibold text-lg">
                    Reviews
                </header>
                <div className="flex border-[1px] border-gray-200 rounded-xl lg:w-[60%] bg-slate-50 mt-4">
                    <div className="flex items-center gap-1 basis-1/3 border-r-[1px] flex-col justify-center">
                        <div className="flex items-center text-lg">
                            <div className=" text-yellow-400 flex gap-1">
                                <span>
                                    <AiFillStar />
                                </span>
                            </div>
                            <span className="font-normal text-gray-400">
                                {currentHotel.rating.toFixed(1)} / 5
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            ({currentHotel.totalRating} Reviews)
                        </span>
                    </div>
                    <div className="px-20 py-2 basis-2/3 text-gray-500">
                        <div className="flex justify-between items-center">
                            <span>Excellent</span>
                            <span>3</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Very Good</span>
                            <span>0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Average</span>
                            <span>0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Poor</span>
                            <span>0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Terrible</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[60%] mt-4">
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                </div>
            </div>
        </div>
    )
}

export default HotelId
