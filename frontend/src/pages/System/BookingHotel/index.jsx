import queryString from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { bookingHotelListPaginationSelector, bookingHotelListSelector, getAllBooking } from './bookinghotel.slice'

function BookingHotelListSystem() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const bookings = useSelector(bookingHotelListSelector)
    const pagination = useSelector(bookingHotelListPaginationSelector)
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10
        }
    }, [location.search])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    useEffect(() => {
        dispatch(getAllBooking(queryParams))
    }, [queryParams, dispatch])
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Manage Booking Hotel
                            </h3>
                        </div>
                    </div>
                </div>
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default BookingHotelListSystem
