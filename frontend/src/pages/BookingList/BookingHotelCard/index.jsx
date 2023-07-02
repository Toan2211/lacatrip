import { Tooltip } from 'flowbite-react'
import React from 'react'
import { BiBed } from 'react-icons/bi'
import { FaChild } from 'react-icons/fa'
import { MdChildCare, MdOutlinePayment } from 'react-icons/md'
import { GoClock } from 'react-icons/go'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
function BookingHotelCard({ booking }) {
    const { t } = useTranslation()
    return (
        <div className="w-full min-h-[60px] border-2 border-gray-200 rounded flex p-5 gap-2 items-center">
            <div className="flex flex-col gap-1 font-bold w-[100px] text-3xl items-center justify-center border-r border-gray-200">
                <span className="font-bold text-red-400">
                    {
                        new Date(booking.checkIn)
                            .toDateString()
                            .split(' ')[0]
                    }
                </span>
                <span>{new Date(booking.checkIn).getDate()}</span>
            </div>
            <div className="flex flex-col w-[220px] font-medium  border-r border-gray-200">
                <div className="flex gap-2 items-center">
                    <div>
                        <GoClock />
                    </div>
                    <div>
                        {booking.checkIn.split('T')[0]} -{' '}
                        {booking.checkOut.split('T')[0]}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div>
                        <MdOutlinePayment />
                    </div>
                    <div>Paypal</div>
                </div>
            </div>
            <div className="flex-1  border-r border-gray-200">
                <Link
                    to={`/hotel/${booking.hotelId}`}
                    className=" text-lg font-medium hover:underline hover:text-blue-500"
                >
                    {booking.hotel.name}
                </Link>
                <div className="text-sm text-gray-400">
                    {booking.roomType.title} -{' '}
                    {booking.roomType.description}
                </div>
                <ul className="flex gap-2">
                    {booking.roomDetails.map(roomDetail => (
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
                            <Tooltip content={t('room')} style="light">
                                <BiBed />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{booking.countRooms}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip content={t('adult')} style="light">
                                <FaChild />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{booking.countAdults}
                        </span>
                    </li>
                    <li className="text-center">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip
                                content={t('children')}
                                style="light"
                            >
                                <MdChildCare />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{booking.countChildrens}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="w-[100px] flex flex-col items-center justify-center">
                <div className=" font-bold text-2xl">
                    ${booking.amount}
                </div>
                <div className=" text-sm text-gray-400">
                    {moment
                        .utc(booking.createdAt)
                        .local()
                        .format('YYYY-MM-DD')}
                </div>
            </div>
        </div>
    )
}

export default BookingHotelCard
