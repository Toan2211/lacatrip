import React, { useEffect, useMemo } from 'react'
import BookingHotelCard from './BookingHotelCard'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string'
import {
    bookingHotelListSelector,
    getAllBookingHotelMe,
    bookingHotelListPaginationSelector,
    bookingHotelLoadingSelector
} from '@pages/BookingHotel/bookinghotelclient.slice'
import { Pagination } from 'flowbite-react'
import { path } from '@constants/path'
import { FaHotel } from 'react-icons/fa'
import { BsFillTicketFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
function BookingList() {
    const { t } = useTranslation()
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
    if (loading) return <div>Loading...</div>
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-80 mb-[20vh] pb-[100px] min-h-[100vh]">
            <div className="flex justify-between items-center mb-3">
                <header className=" text-2xl font-semibold mb-4 flex gap-5 items-center">
                    <span>{t('bookings')}</span>
                    <ul className="flex gap-2">
                        <NavLink
                            to={path.bookingmeHotel}
                            className={`${
                                location.pathname.includes(
                                    path.bookingmeHotel
                                )
                                    ? 'bg-slate-100 border-slate-200 '
                                    : 'border-transparent '
                            } lg:flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  px-4 py-2 rounded-xl text-sm`}
                        >
                            <span>
                                <FaHotel />
                            </span>
                            <span>{t('bookingHotel')}</span>
                        </NavLink>
                        <NavLink
                            to={path.bookingmeDestinationTravel}
                            className={`${
                                location.pathname.includes(
                                    path.bookingmeDestinationTravel
                                )
                                    ? 'bg-slate-100 border-slate-200 '
                                    : 'border-transparent '
                            } lg:flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  px-4 py-2 rounded-xl text-sm`}
                        >
                            <span>
                                <BsFillTicketFill />
                            </span>
                            <span>
                                {t('bookingDestinationTravel')}
                            </span>
                        </NavLink>
                    </ul>
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
