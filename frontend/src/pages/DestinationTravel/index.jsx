import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Thumbs, Autoplay } from 'swiper'
import { AiFillStar } from 'react-icons/ai'
import Mybutton from '@components/MyButton'

function DestinationTravelClient() {
    const [thumbsSwiper, setThumbsSwiper] = useState()
    const arrImg = [
        'https://cdn2.ivivu.com/2018/09/26/10/ivivu-dong-thien-mon-750x390.jpg',
        'https://cdn2.ivivu.com/2023/03/13/11/ivivu-keo-ho-lo-trung-quc-750x390.gif',
        'https://cdn2.ivivu.com/2023/03/13/11/ivivu-pho-di-bo-trung-quoc-750x390.gif',
        'https://cdn2.ivivu.com/2017/08/29/17/ivivu-phuong-hoang-co-tran-750x390.jpg',
        'https://cdn2.ivivu.com/2017/06/07/18/ivivu-thien-mon-son-750x390.jpg',
        'https://cdn2.ivivu.com/2018/09/27/11/ivivu-tour-truong-gia-gioi-6n5d-thanh-co-phuong-hoang-vu-han-thien-mon-son-750x390.jpg'
    ]
    return (
        <div className="h-[200vh] max-w-[1535px] px-8 py-5 mt-[26vh] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px]">
            <div className="font-semibold text-xl text-blue-600">
                Da Nang <span>•</span> National Parks Tour One Days
                Huntington Beach
            </div>
            <div className="mt-4 pr-20">
                <span>
                    Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the
                    industry’s standard dummy text ever since the
                    1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen
                    book.
                </span>
            </div>
            <div className="flex w-full">
                <div className="h-[75vh] w-[60%] bg-white p-10">
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
                        {arrImg.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    className="rounded-3xl w-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
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
                        {arrImg.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    className="hover:opacity-70 hover:border-t-slate-600 hover:border-2 rounded-2xl"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="lg:mt-2">
                    <div className=" border-gray-100 shadow-md border-1 w-[30vw] h-[50vh] border-[1px] px-5 py-10 rounded-2xl">
                        <div className="px-4 pb-4 flex justify-between items-center">
                            <div className="mt-4">
                                <span className="font-normal text-gray-400">
                                    From:
                                </span>
                                <span className="font-bold text-xl">
                                    $150.0
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className=" text-yellow-400 flex gap-1">
                                    <span>
                                        <AiFillStar />
                                    </span>
                                </div>
                                <span className="font-normal text-gray-400">
                                    5{' '}
                                </span>
                                <span className="font-normal text-gray-400">
                                    (3 Reviews)
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
            <div className="mt-10">
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
                                5 / 5
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            (3 Reviews)
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
