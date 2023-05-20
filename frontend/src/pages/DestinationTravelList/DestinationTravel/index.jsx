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
            <div className="font-semibold text-xl text-blue-600">
                {currentDestination.province.name} <span>•</span>{' '}
                {currentDestination.name}
            </div>
            <div className="mt-4 lg:pr-20 min-h-[60px]">
                <span>{currentDestination.description}</span>
            </div>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="h-[75vh]  w-full lg:w-[60%] bg-white lg:p-10 p-4">
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
                    <div className=" border-gray-100 shadow-md border-1 lg:w-[30vw] w-full h-[50vh] border-[1px] px-5 py-10 rounded-2xl">
                        <div className="px-4 pb-4 flex justify-between items-center">
                            <div className="mt-4">
                                <span className="font-normal text-gray-400">
                                    From:
                                </span>
                                <span className="font-bold text-xl">
                                    ${currentDestination.price}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className=" text-yellow-400 flex gap-1">
                                    <span>
                                        <AiFillStar />
                                    </span>
                                </div>
                                <span className="font-normal text-gray-400">
                                    {currentDestination.rating}{' '}
                                </span>
                                <span className="font-normal text-gray-400">
                                    ({currentDestination.totalRating}{' '}
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
                                    <span className="text-sm">5</span>
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
            </div>
            {currentDestination.itineraries.length > 0 && (
                <div className="mt-20 min-h-[400px]">
                    <header className="font-semibold text-lg mb-5">
                        Itinerary
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
                                        You will get picked up
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
                                        You will return to the
                                        starting point
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
                                {currentDestination.rating.toFixed(1)}{' '}
                                / 5
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            ({currentDestination.totalRating} Reviews)
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
                    <div className="w-full border-b py-2">
                        <div>
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="w-16 h-16 object-cover rounded-full"
                                        src="https://secure.gravatar.com/avatar/?s=100&d=mm&r=g"
                                    />
                                </div>
                                <div className="ml-2 flex flex-col">
                                    <span>Customer</span>
                                    <span>2/2/2022</span>
                                </div>
                            </div>
                        </div>
                        <div className=" text-yellow-400 flex gap-1 mt-2">
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <div>
                            The customer service before departure was
                            excellent, the organisation from start to
                            finish was excellent, the accommodation
                            was better than expected, the group leader
                            was excellent, the itinerary was
                            excellent. As a solo female traveller I
                            felt completely comfortable with the rest
                            of the group whether they were traveling
                            alone, with friends or with partners.
                        </div>
                    </div>
                    <div className="w-full border-b py-2">
                        <div>
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="w-16 h-16 object-cover rounded-full"
                                        src="https://secure.gravatar.com/avatar/?s=100&d=mm&r=g"
                                    />
                                </div>
                                <div className="ml-2 flex flex-col">
                                    <span>Customer</span>
                                    <span>2/2/2022</span>
                                </div>
                            </div>
                        </div>
                        <div className=" text-yellow-400 flex gap-1 mt-2">
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <div>
                            The customer service before departure was
                            excellent, the organisation from start to
                            finish was excellent, the accommodation
                            was better than expected, the group leader
                            was excellent, the itinerary was
                            excellent. As a solo female traveller I
                            felt completely comfortable with the rest
                            of the group whether they were traveling
                            alone, with friends or with partners.
                        </div>
                    </div>
                    <div className="w-full border-b py-2">
                        <div>
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="w-16 h-16 object-cover rounded-full"
                                        src="https://secure.gravatar.com/avatar/?s=100&d=mm&r=g"
                                    />
                                </div>
                                <div className="ml-2 flex flex-col">
                                    <span>Customer</span>
                                    <span>2/2/2022</span>
                                </div>
                            </div>
                        </div>
                        <div className=" text-yellow-400 flex gap-1 mt-2">
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <div>
                            The customer service before departure was
                            excellent, the organisation from start to
                            finish was excellent, the accommodation
                            was better than expected, the group leader
                            was excellent, the itinerary was
                            excellent. As a solo female traveller I
                            felt completely comfortable with the rest
                            of the group whether they were traveling
                            alone, with friends or with partners.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DestinationTravelClient
