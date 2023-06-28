import { loadingPropertySelector } from '@pages/CommonProperty/baseproperty'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const CardTopProvince = ({ province }) => {
    return (
        <Link to={`/province/${province.id}`} className="relative cursor-pointer h-[300px] scale-95 hover:scale-100 ease-in duration-300 overflow-hidden  transition-transform">
            <img
                src={province.image}
                className="rounded-2xl cursor-pointer object-cover brightness-75 w-full h-full"
            />
            <div className="absolute top-0 text-white flex flex-col items-center w-full h-full justify-center">
                <span className="font-bold text-xl">
                    {province.name}
                </span>
                <span className="font-semibold flex gap-2">
                    <span>
                        {province.countDestination} Tour du lịch
                    </span>
                    <span>•</span>
                    <span>{province.countHotel} Khách sạn</span>
                    <span>•</span>
                    <span>
                        {province.countRestaurant} Nhà hàng
                    </span>
                </span>
            </div>
        </Link>
    )
}
function TopProvince({ provinces }) {
    const loading = useSelector(loadingPropertySelector)
    return (
        <section className="max-w-[1535px] px-8 py-5 mt-[26vh] md:mt-40 md:px-10 lg:mt-16 lg:px-20">
            <header className="text-center font-semibold text-3xl mb-5">
                Những điểm đến hấp dẫn
            </header>
            <div className="grid gap-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {provinces.length > 0 && provinces.slice(0, 6).map(province => (
                    <CardTopProvince
                        key={province.id}
                        province={province}
                    />
                ))}

                {!!loading && provinces.length === 0 &&
                    Array.from(Array(6).keys()).map(index => (
                        <div
                            key={index}
                            className="relative cursor-pointer h-[300px] scale-90 hover:scale-100 ease-in duration-300 overflow-hidden transition-transform"
                        >
                            <Skeleton height={285} />
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default TopProvince
