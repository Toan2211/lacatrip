import queryString from 'query-string'
import React, {
    forwardRef,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    bookingHotelListPaginationSelector,
    bookingHotelListSelector,
    getAllBooking
} from './bookinghotel.slice'
import { getDateString } from '@utils/getDateString'
import ReactDatePicker from 'react-datepicker'
import { serviceManagersSelector } from '../ServiceManagers/servicemanager.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import Select from 'react-select'
import BookingCard from './BookingCard'
import { Pagination } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

function BookingHotelListSystem() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const profile = useSelector(selectUser)
    const serviceManagers = useSelector(serviceManagersSelector)
    const bookings = useSelector(bookingHotelListSelector)
    const pagination = useSelector(bookingHotelListPaginationSelector)
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [serviceManagerInput, setServiceManagerInput] = useState({
        value: 999,
        label: `${t('filters')} ${t('serviceManager')}`
    })
    const [keyword, setKeyword] = useState('')
    const handleChangeKeyword = e => {
        setKeyword(e.target.value)
    }
    const handleBlurKeyword = e => {
        const filters = {
            ...queryParams,
            keyword: e.target.value
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleKeyDownKeyword = e => {
        if (e.key === 'Enter') {
            const filters = {
                ...queryParams,
                keyword: keyword
            }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        if (profile.serviceManagerId)
            params.serviceManagerId = profile.serviceManagerId
        return {
            checkIn: params.checkIn || '',
            checkOut: params.checkOut || '',
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            serviceManagerId: profile.serviceManagerId
                ? profile.serviceManagerId
                : params.serviceManagerId || '',
            keyword: params.keyword || ''
        }
    }, [location.search, profile])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const ExampleCustomCheckIn = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center  border border-slate-300 hover:border-blue-500 rounded-md overflow-hidden bg-white"
                onClick={onClick}
            >
                <div className="flex flex-col items-center">
                    <span className="font-medium text-md">
                        {t('checkIn')}
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || t('addDate')}
                    </span>
                </div>
            </div>
        )
    )
    const ExampleCustomCheckOut = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className=" bg-white flex-1 flex gap-3 items-center cursor-pointer justify-center border border-slate-300 hover:border-blue-500 rounded-md overflow-hidden"
                onClick={onClick}
            >
                <div className="flex flex-col items-center">
                    <span className="font-medium text-md">
                        {t('checkOut')}
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || t('addDate')}
                    </span>
                </div>
            </div>
        )
    )
    const handleChangeCheckIn = date => {
        setCheckIn(date)
        const filters = {
            ...queryParams,
            checkIn: getDateString(date)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleChangeCheckOut = date => {
        setCheckOut(date)
        const filters = {
            ...queryParams,
            checkOut: getDateString(date)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleChaneServiceManager = value => {
        setServiceManagerInput(value)
        const filters = {
            ...queryParams,
            serviceManagerId: value.value !== 999 ? value.value : ''
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    useEffect(() => {
        dispatch(getAllBooking(queryParams))
    }, [queryParams, dispatch])
    useEffect(() => {
        document.title = t('manageBookingHotel')
    }, [t])
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                {t('manageBookingHotel')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-8 px-3 py-5 border border-slate-300 rounded bg-slate-50 mb-5">
                    <div className="flex-1">
                        <input
                            value={keyword}
                            onChange={handleChangeKeyword}
                            onBlur={handleBlurKeyword}
                            onKeyDown={handleKeyDownKeyword}
                            placeholder={`${t('search')} ${t('by')} ${t('name').toLowerCase()} ${t('hotel').toLowerCase()} ${t('name').toLowerCase()}, ${t('name').toLowerCase()} ${t('client').toLowerCase()}`}
                            className=" border border-gray-300 px-4 py-[10px] bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                    </div>
                    <div className=" w-full lg:flex-1 flex justify-between items-center gap-2">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkIn}
                            onChange={handleChangeCheckIn}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            customInput={<ExampleCustomCheckIn />}
                        />
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkOut}
                            onChange={handleChangeCheckOut}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            customInput={<ExampleCustomCheckOut />}
                        />
                    </div>
                    {!profile.serviceManagerId && (
                        <div className="flex-1">
                            <Select
                                styles={{
                                    control: baseStyles => ({
                                        ...baseStyles,
                                        height: '44px'
                                    })
                                }}
                                onChange={handleChaneServiceManager}
                                value={serviceManagerInput}
                                placeholder={`${t('filters')} ${t(
                                    'serviceManager'
                                )}`}
                                options={[
                                    {
                                        value: 999,
                                        label: `${t('filters')} ${t(
                                            'serviceManager'
                                        )}`
                                    },
                                    ...serviceManagers.map(
                                        servicemanager => ({
                                            value: servicemanager.id,
                                            label:
                                                servicemanager.user
                                                    .firstname +
                                                servicemanager.user
                                                    .lastname
                                        })
                                    )
                                ]}
                            />
                        </div>
                    )}
                </div>

                <ul className="flex flex-col gap-2">
                    {bookings.length > 0 &&
                        bookings.map(booking => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                            />
                        ))}
                </ul>
                <div className="flex items-center justify-end mt-2">
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
        </div>
    )
}

export default BookingHotelListSystem
