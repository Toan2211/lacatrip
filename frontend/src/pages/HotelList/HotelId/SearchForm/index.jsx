import Mybutton from '@components/MyButton'
import { currentHotelClientSelector } from '@pages/HotelList/hotelclient.slice'
import moment from 'moment'
import queryString from 'query-string'
import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { AiFillStar } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDateString } from '@utils/getDateString'

function SearchForm() {
    const location = useLocation()
    const [checkIn, setCheckIn] = useState(new Date(moment()))
    const [checkOut, setCheckOut] = useState(
        new Date(moment().add(1, 'days'))
    )
    const [showGuest, setShowGuest] = useState(false)
    const [countRooms, setCountRooms] = useState(1)
    const [countAdults, setCountAdults] = useState(1)
    const [countChildrens, setCountChildrens] = useState(0)
    const currentHotel = useSelector(currentHotelClientSelector)
    const navigate = useNavigate()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            checkIn: params.checkIn || getDateString(new Date(moment())),
            checkOut: params.checkOut || getDateString(new Date(moment().add(1, 'days'))),
            countRooms: Number.parseInt(params.countRooms) || 1,
            countAdults: Number.parseInt(params.countAdults) || 1,
            countChildrens:
                Number.parseInt(params.countChildrens) || 0,
            hotelId: currentHotel.id
        }
    }, [location.search, currentHotel])
    const ExampleCustomCheckIn = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center  border-r border-gray-400 p-4"
                onClick={onClick}
            >
                <div className="flex flex-col">
                    <span className="font-medium text-md">
                        Check in
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || 'Add Date'}
                    </span>
                </div>
            </div>
        )
    )
    const ExampleCustomCheckOut = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center p-4"
                onClick={onClick}
            >
                <div className="flex flex-col">
                    <span className="font-medium text-md">
                        Check out
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || 'Add Date'}
                    </span>
                </div>
            </div>
        )
    )
    const handleUpCount = type => {
        if (type === 'rooms') setCountRooms(prev => prev + 1)
        else if (type === 'adults') setCountAdults(prev => prev + 1)
        else setCountChildrens(prev => prev + 1)
    }
    const handleDownCount = type => {
        if (type === 'rooms' && countRooms > 0)
            setCountRooms(prev => prev - 1)
        else if (type === 'adults' && countAdults > 0)
            setCountAdults(prev => prev - 1)
        else if (type === 'childrens' && countChildrens > 0)
            setCountChildrens(prev => prev - 1)
    }
    const handleCheckAvailability = () => {
        const filters = {
            ...queryParams,
            countRooms: countRooms,
            countChildrens: countChildrens,
            countAdults: countAdults,
            checkIn: getDateString(checkIn),
            checkOut:  getDateString(checkOut)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    useEffect(() => {
        navigate(`?${queryString.stringify(queryParams)}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="lg:mt-2">
            <div className=" border-gray-100 shadow-md border-1 lg:w-[30vw] w-full h-[50vh] border-[1px] px-5 py-10 rounded-2xl">
                <div className="px-4 pb-4 flex justify-between items-center">
                    <div className="mt-4">
                        <span className="font-normal text-gray-400">
                            From:
                        </span>
                        <span className="font-bold text-xl">
                            ${currentHotel.cheapestPrice}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className=" text-yellow-400 flex gap-1">
                            <span>
                                <AiFillStar />
                            </span>
                        </div>
                        <span className="font-normal text-gray-400">
                            {currentHotel.rating}{' '}
                        </span>
                        <span className="font-normal text-gray-400">
                            ({currentHotel.totalRating} Reviews)
                        </span>
                    </div>
                </div>
                <div className="border border-gray-300 rounded-2xl w-full">
                    <div className="border-b border-gray-300 w-full flex justify-between items-center">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkIn}
                            onChange={date => setCheckIn(date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            customInput={<ExampleCustomCheckIn />}
                        />
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={checkOut}
                            onChange={date => setCheckOut(date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            customInput={<ExampleCustomCheckOut />}
                        />
                    </div>
                    <div className="border-gray-300  w-full px-4 py-2 flex justify-between items-center relative">
                        <div
                            onClick={() => setShowGuest(!showGuest)}
                            className="cursor-pointer"
                        >
                            <div className="font-medium text-md">
                                Guests
                            </div>
                            <div className="text-gray-400 text-sm">
                                Add guests and rooms: {countAdults} Guest, {countRooms} Rooms
                            </div>
                        </div>
                        {showGuest && (
                            <div className="z-10 bg-white absolute w-full h-[200px]  top-[60px] left-0 shadow-lg p-4 rounded-md border border-gray-200 text-gray-600">
                                <div className="flex px-3 justify-between items-center border-b border-slate-200 py-3">
                                    <div className="font-medium text-xl">
                                        Rooms
                                    </div>
                                    <div className="flex gap-2">
                                        <div
                                            onClick={() =>
                                                handleDownCount(
                                                    'rooms'
                                                )
                                            }
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                        >
                                            <span className="mb-1">
                                                -
                                            </span>
                                        </div>
                                        <div className=" font-medium rounded-full text-xl flex justify-center items-center  w-[30px]">
                                            <span>{countRooms}</span>
                                        </div>
                                        <div
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                            onClick={() =>
                                                handleUpCount('rooms')
                                            }
                                        >
                                            <span className="mb-1">
                                                +
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex px-3 justify-between items-center border-b border-slate-200 py-3">
                                    <div className="font-medium text-xl">
                                        Adults
                                    </div>
                                    <div className="flex gap-2">
                                        <div
                                            onClick={() =>
                                                handleDownCount(
                                                    'adults'
                                                )
                                            }
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                        >
                                            <span className="mb-1">
                                                -
                                            </span>
                                        </div>
                                        <div className=" font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                                            <span>{countAdults}</span>
                                        </div>
                                        <div
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                            onClick={() =>
                                                handleUpCount(
                                                    'adults'
                                                )
                                            }
                                        >
                                            <span className="mb-1">
                                                +
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex px-3 justify-between items-center py-3">
                                    <div className="font-medium text-xl">
                                        Childrens
                                    </div>
                                    <div className="flex gap-2">
                                        <div
                                            onClick={() =>
                                                handleDownCount(
                                                    'childrens'
                                                )
                                            }
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                        >
                                            <span className="mb-1">
                                                -
                                            </span>
                                        </div>
                                        <div className=" font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                                            <span>
                                                {countChildrens}
                                            </span>
                                        </div>
                                        <div
                                            className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                            onClick={() =>
                                                handleUpCount(
                                                    'childrens'
                                                )
                                            }
                                        >
                                            <span className="mb-1">
                                                +
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-base font-semibold px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                        onClick={handleCheckAvailability}
                    >
                        Check availability
                    </Mybutton>
                </div>
            </div>
        </div>
    )
}

export default SearchForm
