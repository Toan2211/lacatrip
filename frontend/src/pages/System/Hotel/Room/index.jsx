import { Pagination, Table, Tooltip } from 'flowbite-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currentHotelSelector, getHotelById } from '../hotel.slice'
import RoomForm from './Form'
import { getRooms, paginationRoom, roomsSelector, setCurrentRoom } from './room.slice'
import queryString from 'query-string'
import Mybutton from '@components/MyButton'

function Rooms() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentHotel = useSelector(currentHotelSelector)

    const rooms = useSelector(roomsSelector)
    const pagination = useSelector(paginationRoom)
    const [openForm, setOpenForm] = useState(false)
    const showDrawer = () => {
        setOpenForm(true)
    }
    const onClose = () => {
        setOpenForm(false)
        dispatch(setCurrentRoom({}))
        dispatch(getRooms(queryParams))
    }
    const hotelId = useParams().hotelId
    useEffect(() => {
        if (hotelId) dispatch(getHotelById(hotelId))
    }, [hotelId, dispatch])
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            hotelId: hotelId
        }
    }, [location.search, hotelId])
    useEffect(() => {
        dispatch(getRooms(queryParams))
    }, [queryParams, dispatch])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const handleSelectItem = room => {
        dispatch(setCurrentRoom(room))
        showDrawer()
    }
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
                        <Table.Body className="divide-y">
                            {rooms &&
                                rooms.map(room => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={room.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {room.roomNo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {room.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {room.description}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {room.price}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {room.originalPrice}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {room.maxPeople}
                                        </Table.Cell>
                                        <Table.Cell className="flex gap-4">
                                            <Tooltip
                                                content="Detail Room"
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    onClick={() =>
                                                        handleSelectItem(
                                                            room
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
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={Number(pagination.page)}
                        onPageChange={handlePageChange}
                        totalPages={Number(pagination.totalPages)}
                    />
                </div>
            )}
            <RoomForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default Rooms
