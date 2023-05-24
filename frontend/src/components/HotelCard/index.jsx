import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

function HotelCard({ data }) {
    return (
        <NavLink
            to={`/hotel/${data.id}`}
            className=" overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-[468px] hover:shadow-2xl cursor-pointer group"
        >
            <div className=" overflow-hidden relative">
                <img
                    className="h-[260px] w-full object-cover  group-hover:scale-125 transition-transform"
                    src={data.images && data.images[0].url}
                />
                <div className=' absolute top-0 right-0 z-30'>
                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="transparent"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Interface / Heart_02">
                            <path
                                id="Vector"
                                d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z"
                                stroke="red"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </div>
            </div>
            <div className="p-4 flex-1">
                <div className=" text-yellow-400 flex gap-1">
                    {data.hotelClass &&
                        Array.from(Array(data.hotelClass)).map(
                            index => (
                                <span key={index}>
                                    <AiFillStar />
                                </span>
                            )
                        )}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold line-clamp-2">
                        {data.name}
                    </span>
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
        </NavLink>
    )
}

export default HotelCard
