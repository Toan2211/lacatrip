import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper'
import { AiFillStar } from 'react-icons/ai'
import Mybutton from '@components/MyButton'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentDestinationClientSelector,
    getDetailDestination
} from '../destinationclient.slice'
import LoadingPage from '@components/LoadingPage'
import GoogleMaps from '@components/GoogleMap'
import LikeAndShare from '@components/LikeAndShare'
import Comment from '@pages/Comment'
import SearchDestinationForm from '../SearchDestinationForm'

function DestinationTravelClient() {
    const dispatch = useDispatch()
    const id = useParams().id
    const currentDestination = useSelector(
        currentDestinationClientSelector
    )
    useEffect(() => {
        if (id) dispatch(getDetailDestination(id))
    }, [id, dispatch])
    const [thumbsSwiper, setThumbsSwiper] = useState()
    const [center, setCenter] = useState({
        lat: 16.073429,
        lng: 108.149979
    })
    const [markers, setMarkers] = useState(null)
    useEffect(() => {
        if (Object.keys(currentDestination).length) {
            document.title = currentDestination.name
            setCenter({
                lat: currentDestination.latitude,
                lng: currentDestination.longtitude
            })
            let itinerariesMarkers = []
            if (currentDestination.itineraries)
                itinerariesMarkers =
                    currentDestination.itineraries.map(itinerary => ({
                        id: itinerary.id,
                        name: itinerary.title,
                        position: {
                            lat: itinerary.latitude,
                            lng: itinerary.longtitude
                        }
                    }))
            itinerariesMarkers.push({
                id: currentDestination.id,
                name: currentDestination.name,
                position: {
                    lat: currentDestination.latitude,
                    lng: currentDestination.longtitude
                }
            })
            setMarkers(itinerariesMarkers)
        }
    }, [currentDestination])
    if (!Object.keys(currentDestination).length)
        return <LoadingPage />

    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px]">
            <div className="flex justify-end mr-[10%]">
                <LikeAndShare />
            </div>
            <div className="font-semibold text-xl text-blue-600">
                {currentDestination.province.name} <span>•</span>{' '}
                {currentDestination.name}
            </div>
            <div className="mt-4 lg:pr-20 min-h-[60px]">
                <span>{currentDestination.description}</span>
            </div>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="h-[75vh]  w-full lg:w-[60%] bg-white lg:px-10 lg:pb-10 p-4">
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        effect={'fade'}
                        thumbs={{
                            swiper:
                                thumbsSwiper &&
                                !thumbsSwiper.destroyed
                                    ? thumbsSwiper
                                    : null
                        }}
                        modules={[
                            Navigation,
                            Thumbs,
                            EffectFade,
                            Autoplay
                        ]}
                        navigation={true}
                        grabCursor={true}
                        pagination={{
                            clickable: true
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                    >
                        {currentDestination.images.map(
                            (img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img.url}
                                        className="rounded-3xl w-full object-cover lg:h-[60vh] h-[300px]"
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                    {currentDestination.images.length > 4 && (
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            watchSlidesProgress={true}
                            modules={[EffectFade, Navigation, Thumbs]}
                            grabCursor={true}
                            freeMode={true}
                            className="mt-2"
                        >
                            {currentDestination.images.map(
                                (img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img.url}
                                            className="hover:opacity-70 rounded-2xl h-[120px] object-cover"
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                    )}
                </div>
                <div className="lg:mt-2">
                    <SearchDestinationForm />
                </div>
            </div>
            {currentDestination.itineraries.length > 0 && (
                <div className="mt-20 min-h-[400px]">
                    <header className="font-semibold text-lg mb-5">
                        Hành trình
                    </header>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:basis-1/3 cursor-pointer">
                            <div className="flex gap-3 min-h-[60px]">
                                <div className="flex flex-col">
                                    <span className=" border-black w-10 h-10 border-[1px] rounded-full text-center">
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="20px"
                                            height="20px"
                                            className="block mt-[22%] ml-[22%]"
                                        >
                                            <path d="M12 2C7.745 2 4.27 5.475 4.27 9.73c0 4.539 4.539 9.056 6.971 11.486L12 22l.759-.761c2.433-2.453 6.972-6.97 6.972-11.509C19.73 5.475 16.256 2 12 2zm0 10.986c-1.93 0-3.5-1.569-3.5-3.5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.931-1.57 3.5-3.5 3.5z"></path>
                                        </svg>
                                    </span>
                                    <div className="flex-1 border-l-2 border-gray-300 border-dotted ml-[50%]"></div>
                                </div>
                                <div>
                                    <span className="font-semibold text-lg">
                                        Bạn sẽ được đón
                                    </span>
                                </div>
                            </div>
                            {currentDestination.itineraries.map(
                                (itinerary, index) => (
                                    <div
                                        className="flex gap-3 min-h-[70px]"
                                        key={itinerary.id}
                                        onClick={() =>
                                            setCenter({
                                                lat: itinerary.latitude,
                                                lng: itinerary.longtitude
                                            })
                                        }
                                    >
                                        <div className="flex flex-col">
                                            <span className=" border-black w-10 h-10 border-[1px] rounded-full text-center">
                                                <span className="block mt-[22%] ml-[22%] w-[20px] h-[20px] font-bold">
                                                    {index + 1}
                                                </span>
                                            </span>
                                            <div className="flex-1 border-l-2 border-gray-300 border-dotted ml-[50%]"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-lg">
                                                {itinerary.title}
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                {
                                                    itinerary.description
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="flex gap-3 min-h-[60px]">
                                <div className="flex flex-col">
                                    <span className=" border-black w-10 h-10 border-[1px] rounded-full text-center">
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="20px"
                                            height="20px"
                                            className="block mt-[22%] ml-[22%]"
                                        >
                                            <path d="M12 2C7.745 2 4.27 5.475 4.27 9.73c0 4.539 4.539 9.056 6.971 11.486L12 22l.759-.761c2.433-2.453 6.972-6.97 6.972-11.509C19.73 5.475 16.256 2 12 2zm0 10.986c-1.93 0-3.5-1.569-3.5-3.5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.931-1.57 3.5-3.5 3.5z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-lg">
                                        Bạn sẽ được trả về tại điểm đón
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:basis-2/3 lg:pr-10">
                            <GoogleMaps
                                center={center}
                                markers={markers}
                            ></GoogleMaps>
                        </div>
                    </div>
                </div>
            )}
            <Comment
                rating={currentDestination.rating}
                totalRating={currentDestination.totalRating}
            />
        </div>
    )
}

export default DestinationTravelClient
