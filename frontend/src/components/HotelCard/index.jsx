import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function HotelCard({ data }) {
    return (
        <div className=" overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-[468px] hover:shadow-2xl cursor-pointer group">
            <div className=' overflow-hidden'>
                <img className='h-[260px] w-full object-cover  group-hover:scale-125 transition-transform' src={data.images && data.images[0].url} />
            </div>
            <div className="p-4 flex-1">
                <div className=" text-yellow-400 flex gap-1">
                    {data.hotelClass && Array.from(Array(data.hotelClass)).map((index) => (
                        <span key={index}>
                            <AiFillStar />
                        </span>
                    ))}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold line-clamp-2">{data.name}</span>
                    <span className="font-medium text-gray-400">
                        {data?.province?.name || ''}
                    </span>
                </div>
            </div>
            <div className="px-4 pb-4 border-t-2 border-b-slate-100 pt-4">
                <span>
                    <span className="text-blue-800 bg-blue-100 border-[1px] border-blue-400 font-medium rounded-md text-md p-1 mr-4">
                        {data.rating} / 5
                    </span>
                    <span className="font-normal text-gray-400">
                        {data.totalRating} Reviews
                    </span>
                </span>
                <div className="mt-4">
                    <span className="font-normal text-gray-400">
                        From:{' '}
                    </span>
                    <span className="font-bold">
                        ${data.cheapestPrice}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HotelCard