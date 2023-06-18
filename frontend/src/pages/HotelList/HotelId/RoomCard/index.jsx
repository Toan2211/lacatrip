import { path } from '@constants/path'
import { Tooltip } from 'flowbite-react'
import React from 'react'
import { BiArea, BiBed } from 'react-icons/bi'
import { FaChild } from 'react-icons/fa'
import { MdChildCare } from 'react-icons/md'
import { Link } from 'react-router-dom'
import _ from 'lodash'

function RoomCard({ data }) {
    if (_.isEmpty(data.roomDetails || []))
        return <></>
    return (
        <div className="flex lg:h-[200px] border-[1px] border-slate-200 rounded-xl overflow-hidden">
            <div className="flex-1">
                <img
                    className="w-full h-full object-cover"
                    src={data.image}
                />
            </div>
            <div className="flex-1 border-r-[1px] border-slate-200 p-3">
                <span className="text-sm text-blue-700 font-semibold">
                    {data.title}
                </span>
                <ul className="mt-10 flex gap-2 mx-auto">
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Area" style="light">
                                <BiArea />
                            </Tooltip>
                        </span>
                        <span className="text-sm">{data.area}m2</span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Bed" style="light">
                                <BiBed />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{data.bedCount}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Adult" style="light">
                                <FaChild />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{data.adultCount}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content="Children" style="light">
                                <MdChildCare />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{data.childrenCount}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="flex-1  justify-center flex items-center font-medium lg:text-lg text-sm flex-col">
                ${data.price} / night
                <Link
                    to={{
                        pathname: path.bookingHotel,
                        search: `${location.search}&roomId=${data.id}&roomDetailIds=${data.roomDetails.map(room => room.id).toString()}`
                    }}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                >
                    Book Now
                </Link>
            </div>
        </div>
    )
}

export default RoomCard
