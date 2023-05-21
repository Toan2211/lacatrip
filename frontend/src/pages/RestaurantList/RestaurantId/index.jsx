import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    currentRestauRantClientSelector,
    getRestaurantDetailClient
} from '../restaurantclient.slice'
import LoadingPage from '@components/LoadingPage'
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AiFillStar } from 'react-icons/ai'
import GoogleMap from '@components/GoogleMap'
import CommentCard from '@components/CommentCard'
import LikeAndShare from '@components/LikeAndShare'
function RestaurantId() {
    const dispatch = useDispatch()
    const id = useParams().id
    const currentRestaurant = useSelector(
        currentRestauRantClientSelector
    )
    const [thumbsSwiper, setThumbsSwiper] = useState()
    useEffect(() => {
        if (id) dispatch(getRestaurantDetailClient(id))
    }, [id, dispatch])
    useEffect(() => {
        document.title = currentRestaurant.name
    }, [currentRestaurant])
    if (!Object.keys(currentRestaurant).length) return <LoadingPage />
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px]">
            <div className='flex justify-end mr-[14%]'>
                <LikeAndShare />
            </div>
            <div className=" ml-[12%]">
                <div className="font-semibold text-2xl">
                    {currentRestaurant.name}
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
                        {currentRestaurant.address}
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
                    {currentRestaurant.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.url}
                                className="w-full object-cover lg:h-[60vh] h-[300px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {currentRestaurant.images.length > 4 && (
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
                        {currentRestaurant.images.map(
                            (img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img.url}
                                        className="hover:opacity-70 h-[120px] object-cover lg:w-[250px]"
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                )}
            </div>
            <div className="flex flex-col lg:flex-row gap-3 min-h-[300px]">
                <div className="flex-1 border-[1px] border-gray-200 p-4">
                    <header className="font-semibold">
                        Description about restaurant
                    </header>
                    <span>{currentRestaurant.description}</span>
                </div>
                <div className="flex-1 border-[1px] border-gray-200 p-4">
                    <header className="font-semibold mb-3">
                        Detail service
                    </header>
                    <span className="flex flex-col text-sm mb-2">
                        <span className="font-semibold">
                            PRICE RANGE
                        </span>
                        <span className="flex flex-col">
                            ${currentRestaurant.minPrice} - $
                            {currentRestaurant.maxPrice}
                        </span>
                    </span>
                    <span className="flex flex-col text-sm mb-2">
                        <span className="font-semibold">
                            CUISINES
                        </span>
                        <span>{currentRestaurant.cusines}</span>
                    </span>
                    <span className="flex flex-col text-sm mb-2">
                        <span className="font-semibold">
                            SPECIAL DIETS
                        </span>
                        <span>{currentRestaurant.specialDiets}</span>
                    </span>
                </div>
                <div className="flex-1 border-[1px] border-gray-200 p-4">
                    <header className="font-semibold">
                        Location and contact
                    </header>
                    <div className="h-[240px] mt-4">
                        <GoogleMap
                            center={{
                                lat: currentRestaurant.latitude,
                                lng: currentRestaurant.longtitude
                            }}
                            markers={[
                                {
                                    id: currentRestaurant.id,
                                    name: currentRestaurant.name,
                                    position: {
                                        lat: currentRestaurant.latitude,
                                        lng: currentRestaurant.longtitude
                                    }
                                }
                            ]}
                        />
                    </div>
                    <span className="flex mt-10">
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
                            {currentRestaurant.address}
                        </span>
                    </span>
                    <span className="flex">
                        <span className="w-6 h-10 text-center">
                            <svg
                                fill="#000000"
                                height="16px"
                                width="16px"
                                version="1.1"
                                viewBox="0 0 473.806 473.806"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M374.456,293.506c-9.7-10.1-21.4-15.5-33.8-15.5c-12.3,0-24.1,5.3-34.2,15.4l-31.6,31.5c-2.6-1.4-5.2-2.7-7.7-4
			c-3.6-1.8-7-3.5-9.9-5.3c-29.6-18.8-56.5-43.3-82.3-75c-12.5-15.8-20.9-29.1-27-42.6c8.2-7.5,15.8-15.3,23.2-22.8
			c2.8-2.8,5.6-5.7,8.4-8.5c21-21,21-48.2,0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5c-6-6.2-12.3-12.6-18.8-18.6
			c-9.7-9.6-21.3-14.7-33.5-14.7s-24,5.1-34,14.7c-0.1,0.1-0.1,0.1-0.2,0.2l-34,34.3c-12.8,12.8-20.1,28.4-21.7,46.5
			c-2.4,29.2,6.2,56.4,12.8,74.2c16.2,43.7,40.4,84.2,76.5,127.6c43.8,52.3,96.5,93.6,156.7,122.7c23,10.9,53.7,23.8,88,26
			c2.1,0.1,4.3,0.2,6.3,0.2c23.1,0,42.5-8.3,57.7-24.8c0.1-0.2,0.3-0.3,0.4-0.5c5.2-6.3,11.2-12,17.5-18.1c4.3-4.1,8.7-8.4,13-12.9
			c9.9-10.3,15.1-22.3,15.1-34.6c0-12.4-5.3-24.3-15.4-34.3L374.456,293.506z M410.256,398.806
			C410.156,398.806,410.156,398.906,410.256,398.806c-3.9,4.2-7.9,8-12.2,12.2c-6.5,6.2-13.1,12.7-19.3,20
			c-10.1,10.8-22,15.9-37.6,15.9c-1.5,0-3.1,0-4.6-0.1c-29.7-1.9-57.3-13.5-78-23.4c-56.6-27.4-106.3-66.3-147.6-115.6
			c-34.1-41.1-56.9-79.1-72-119.9c-9.3-24.9-12.7-44.3-11.2-62.6c1-11.7,5.5-21.4,13.8-29.7l34.1-34.1c4.9-4.6,10.1-7.1,15.2-7.1
			c6.3,0,11.4,3.8,14.6,7c0.1,0.1,0.2,0.2,0.3,0.3c6.1,5.7,11.9,11.6,18,17.9c3.1,3.2,6.3,6.4,9.5,9.7l27.3,27.3
			c10.6,10.6,10.6,20.4,0,31c-2.9,2.9-5.7,5.8-8.6,8.6c-8.4,8.6-16.4,16.6-25.1,24.4c-0.2,0.2-0.4,0.3-0.5,0.5
			c-8.6,8.6-7,17-5.2,22.7c0.1,0.3,0.2,0.6,0.3,0.9c7.1,17.2,17.1,33.4,32.3,52.7l0.1,0.1c27.6,34,56.7,60.5,88.8,80.8
			c4.1,2.6,8.3,4.7,12.3,6.7c3.6,1.8,7,3.5,9.9,5.3c0.4,0.2,0.8,0.5,1.2,0.7c3.4,1.7,6.6,2.5,9.9,2.5c8.3,0,13.5-5.2,15.2-6.9
			l34.2-34.2c3.4-3.4,8.8-7.5,15.1-7.5c6.2,0,11.3,3.9,14.4,7.3c0.1,0.1,0.1,0.1,0.2,0.2l55.1,55.1
			C420.456,377.706,420.456,388.206,410.256,398.806z"
                                        />
                                        <path
                                            d="M256.056,112.706c26.2,4.4,50,16.8,69,35.8s31.3,42.8,35.8,69c1.1,6.6,6.8,11.2,13.3,11.2c0.8,0,1.5-0.1,2.3-0.2
			c7.4-1.2,12.3-8.2,11.1-15.6c-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3,3.7-15.6,11
			S248.656,111.506,256.056,112.706z"
                                        />
                                        <path
                                            d="M473.256,209.006c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2,3.7-15.5,11
			c-1.2,7.4,3.7,14.3,11.1,15.6c46.6,7.9,89.1,30,122.9,63.7c33.8,33.8,55.8,76.3,63.7,122.9c1.1,6.6,6.8,11.2,13.3,11.2
			c0.8,0,1.5-0.1,2.3-0.2C469.556,223.306,474.556,216.306,473.256,209.006z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <span className="text-sm">
                            {currentRestaurant.phone}
                        </span>
                    </span>
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
                                {currentRestaurant.rating.toFixed(1)}{' '}
                                / 5
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            ({currentRestaurant.totalRating} Reviews)
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

export default RestaurantId
