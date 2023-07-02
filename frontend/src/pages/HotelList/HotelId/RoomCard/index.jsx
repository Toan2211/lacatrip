import { path } from '@constants/path'
import { Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import { BiArea, BiBed } from 'react-icons/bi'
import { FaChild } from 'react-icons/fa'
import { MdChildCare } from 'react-icons/md'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

function RoomCard({ data }) {
    const { t } = useTranslation()
    const [countRooms, setCountRooms] = useState(1)
    const handleDownCount = () => {
        if (countRooms > 1) setCountRooms(prev => prev - 1)
    }
    const handleUpCount = () => {
        if (countRooms < data?.roomDetails?.length) {
            setCountRooms(prev => prev + 1)
        }
    }
    if (_.isEmpty(data.roomDetails || [])) return <></>
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
                <ul className="flex gap-2">
                    {data.roomDetails.map(roomDetail => (
                        <li
                            key={roomDetail.id}
                            className="border border-slate-200 bg-slate-50 rounded text-sm inline-block px-2 py-1"
                        >
                            No.{roomDetail.roomNo}
                        </li>
                    ))}
                </ul>
                <ul className="mt-2 flex gap-2 mx-auto">
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content={t('area')} style="light">
                                <BiArea />
                            </Tooltip>
                        </span>
                        <span className="text-sm">{data.area}m2</span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content={t('bed')}style="light">
                                <BiBed />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{data.bedCount}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content={t('adult')} style="light">
                                <FaChild />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{data.adultCount}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content={t('children')} style="light">
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
                {data.roomDetails.length > 0 && (
                    <div>
                        {' '}
                        <div className="flex gap-1 items-center">
                            <div
                                onClick={() => handleDownCount()}
                                className=" font-bold rounded-full border border-black w-6 h-6 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                            >
                                <span className="mb-1">-</span>
                            </div>
                            <div className=" font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                                <span>{countRooms}</span>
                            </div>
                            <div
                                className=" font-bold rounded-full border border-black w-6 h-6 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                                onClick={() => handleUpCount()}
                            >
                                <span className="mb-1">+</span>
                            </div>
                        </div>
                    </div>
                )}
                ${data.price} / night
                <Link
                    to={{
                        pathname: path.bookingHotel,
                        search: `${
                            location.search
                        }&countRooms=${countRooms}&roomId=${
                            data.id
                        }&roomDetailIds=${data.roomDetails
                            .map(room => room.id)
                            .toString()}`
                    }}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                >
                    {t('bookNow')}
                </Link>
            </div>
        </div>
    )
}

export default RoomCard
