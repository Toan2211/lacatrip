import React, { useEffect, useMemo } from 'react'
import BookingHotelCard from './BookingHotelCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import {
    bookingHotelListSelector,
    getAllBookingHotelMe,
    bookingHotelListPaginationSelector,
    bookingHotelLoadingSelector
} from '@pages/BookingHotel/bookinghotelclient.slice'
import { Pagination } from 'flowbite-react'

function BookingList() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookingHotels = useSelector(bookingHotelListSelector)
    const pagination = useSelector(bookingHotelListPaginationSelector)
    const loading = useSelector(bookingHotelLoadingSelector)
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
        dispatch(getAllBookingHotelMe(queryParams))
    }, [queryParams, dispatch])
    useEffect(() => {
        document.title = 'Booking List'
    }, [])
    if (loading ) return <div>Loading...</div>
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-80 mb-[20vh] pb-[100px] min-h-[100vh]">
            <div className="flex justify-between items-center mb-3">
                <header className=" text-2xl font-semibold mb-4">
                    Bookings
                </header>
                <div className="flex items-center">
                    {pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={Number(pagination.page)}
                            onPageChange={handlePageChange}
                            totalPages={Number(pagination.totalPages)}
                            showIcons
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {bookingHotels.map(booking => (
                    <BookingHotelCard
                        key={booking.id}
                        booking={booking}
                    />
                ))}
            </div>
        </div>
    )
}

export default BookingList
