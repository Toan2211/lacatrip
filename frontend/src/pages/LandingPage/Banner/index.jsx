import React from 'react'
import { Autoplay, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import cap from '@assets/img/cap.jpg'
import danang from '@assets/img/danang.jpg'
import dragonbridge from '@assets/img/dragonbridge.jpg'
import halongbay from '@assets/img/halongbay.jpg'
import huecity from '@assets/img/huecity.jpg'
import phuquoc from '@assets/img/Phu-Quoc.jpg'
import phuquocisland from '@assets/img/phuquocisland.jpg'
import trangan from '@assets/img/trangan.jpg'

function Banner() {
    const arrImg = [
        cap,
        danang,
        dragonbridge,
        halongbay,
        huecity,
        phuquoc,
        phuquocisland,
        trangan
    ]
    return (
        <div className=" max-w-[1535px] h-[80vh]">
            <Swiper
                loop={true}
                spaceBetween={10}
                effect={'fade'}
                modules={[EffectFade, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                className="h-full w-full"
            >
                {arrImg.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            className=" object-cover w-full h-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Banner
