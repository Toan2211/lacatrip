import { Modal, Tooltip } from 'flowbite-react'
import moment from 'moment'
import React, { useState } from 'react'
import { GoClock } from 'react-icons/go'
import { MdAirplaneTicket, MdOutlinePayment } from 'react-icons/md'
import { Link } from 'react-router-dom'

function BookingDestinationCard({ booking }) {
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState(null)
    const [dataUser, setDataUser] = useState({})
    const onClose = () => setShowModal(false)
    const handleShowModal = (type, data) => {
        setShowModal(true)
        setType(type)
        setDataUser(data)
    }
    return (
        <>
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
                        to={`/system/destination-travel?key=${booking.destinationTravel.name}`}
                        className=" text-lg font-medium hover:underline hover:text-blue-500"
                    >
                        {booking.destinationTravel.name}
                    </Link>
                    <ul>
                        <li className="text-center w-[40px]">
                            <span className="border-[1px] border-slate-200 p-2 w-10 flex justify-center items-center rounded-lg">
                                <Tooltip
                                    content="Count Ticket"
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
                <div className="w-[250px] border-r border-gray-200">
                    <div className="flex gap-2 items-center">
                        <span className="text-sm text-slate-500">
                            Service Manger:
                        </span>
                        <Tooltip
                            content="Service Manager"
                            style="light"
                        >
                            <div
                                className=" hover:underline hover:text-blue-500 cursor-pointer"
                                onClick={() =>
                                    handleShowModal(
                                        1,
                                        booking.serviceManager.user
                                    )
                                }
                            >
                                {
                                    booking.serviceManager.user
                                        .firstname
                                }{' '}
                                {booking.serviceManager.user.lastname}
                            </div>
                        </Tooltip>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-sm text-slate-500">
                            Client:
                        </span>
                        <Tooltip content="Client" style="light">
                            <div
                                className=" hover:underline hover:text-blue-500 cursor-pointer"
                                onClick={() =>
                                    handleShowModal(0, booking.user)
                                }
                            >
                                {booking.user.firstname}{' '}
                                {booking.user.lastname}
                            </div>
                        </Tooltip>
                    </div>
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
            <Modal
                show={showModal}
                onClose={onClose}
                size="md"
                dismissible={true}
                popup={true}
            >
                <Modal.Header className=" bg-slate-100">
                    {type
                        ? 'Information about Service Manager'
                        : 'Information about Client'}
                </Modal.Header>
                <Modal.Body>
                    <div className="my-2 text-center">
                        <img
                            src={dataUser.avatar}
                            className="w-20 h-20 rounded-full object-cover mx-auto"
                        />
                    </div>
                    <div className="px-14">
                        <div className="flex gap-3">
                            <label className=" font-semibold">
                                Name:{' '}
                            </label>
                            <div>
                                {dataUser.firstname}{' '}
                                {dataUser.lastname}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <label className=" font-semibold">
                                Email:{' '}
                            </label>
                            <div>{dataUser.email}</div>
                        </div>
                        <div className="flex gap-3">
                            <label className=" font-semibold">
                                Phone:{' '}
                            </label>
                            <div>{dataUser.phone}</div>
                        </div>
                        <div className="flex gap-3">
                            <label className=" font-semibold">
                                Country:{' '}
                            </label>
                            <div>{dataUser.country}</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookingDestinationCard
