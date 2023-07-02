import { Tooltip } from 'flowbite-react'
import React from 'react'
import { MdAirplaneTicket, MdOutlinePayment } from 'react-icons/md'
import { GoClock } from 'react-icons/go'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { t } from 'i18next'
function BookingDestinationCard({ booking }) {
    return (
        <div className="w-full min-h-[60px] border-2 border-gray-200 rounded flex p-5 gap-2 items-center">
            <div className="flex flex-col gap-1 font-bold w-[100px] text-3xl items-center justify-center border-r border-gray-200">
                <span className="font-bold text-red-400">
                    {
                        new Date(booking.date)
                            .toDateString()
                            .split(' ')[0]
                    }
                </span>
                <span>{new Date(booking.date).getDate()}</span>
            </div>
            <div className="flex flex-col w-[220px] font-medium  border-r border-gray-200">
                <div className="flex gap-2 items-center">
                    <div>
                        <GoClock />
                    </div>
                    <div>{booking.date.split('T')[0]}</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div>
                        <MdOutlinePayment />
                    </div>
                    <div className="text-[10px] font-normal">
                        {booking.payment.paymentId}
                    </div>
                </div>
            </div>
            <div className="flex-1  border-r border-gray-200">
                <Link
                    to={`/destination-travel/${booking.destinationTravelId}`}
                    className=" text-lg font-medium hover:underline hover:text-blue-500"
                >
                    {booking.destinationTravel.name}
                </Link>
                <ul>
                    <li className="text-center w-[40px]">
                        <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                            <Tooltip
                                content={t('ticket')}
                                style="light"
                            >
                                <MdAirplaneTicket />
                            </Tooltip>
                        </span>
                        <span className="text-sm">
                            x{booking.countPeople}
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

export default BookingDestinationCard
