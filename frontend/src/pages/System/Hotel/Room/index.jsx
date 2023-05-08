// import { path } from '@constants/path'
// import Mybutton from '@components/MyButton'
import { Table, Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentHotelSelector, getHotelById } from '../hotel.slice'
import RoomForm from './Form'

function Rooms() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentHotel = useSelector(currentHotelSelector)
    const [openForm, setOpenForm] = useState(false)
    const showDrawer = () => {
        setOpenForm(true)
    }
    const onClose = () => {
        setOpenForm(false)
    }
    const id = useParams().id
    useEffect(() => {
        if (id) dispatch(getHotelById(id))
    }, [id, dispatch])

    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Manage Rooms of {currentHotel.name}
                            </h3>
                            <div className="relative flex flex-col items-center group w-10">
                                <Tooltip
                                    content="Create"
                                    style="light"
                                >
                                    <button
                                        className="inline-flex items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150  bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500 ml-4"
                                        onClick={showDrawer}
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Room No</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>
                                Description
                            </Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>
                                Original Price
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Max People
                            </Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        {/* <Table.Body className="divide-y">
                            {hotels &&
                                hotels.map(hotel => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={hotel.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {hotel.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.serviceManager.user
                                                .firstname +
                                                hotel.serviceManager
                                                    .user.lastname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.province.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.rating}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ToggleButton
                                                status={hotel.public}
                                                onClick={() =>
                                                    handleTogglePublic(
                                                        hotel.id
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="flex gap-4">
                                            <Tooltip
                                                content="Detail Room"
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    onClick={() =>
                                                        handleSelectRoom(
                                                            hotel
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </Mybutton>
                                            </Tooltip>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                        </Table.Body> */}
                    </Table>
                </div>
            </div>
            {/* {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={Number(pagination.page)}
                        onPageChange={handlePageChange}
                        totalPages={Number(pagination.totalPages)}
                    />
                </div>
            )} */}
            <RoomForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default Rooms
