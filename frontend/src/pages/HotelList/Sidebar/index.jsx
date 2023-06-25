import Mybutton from '@components/MyButton'
import queryString from 'query-string'
import React, { forwardRef, useMemo, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { AiFillStar, AiOutlineSearch } from 'react-icons/ai'
import { IoCalendarOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router'
import { getDateString } from '@utils/getDateString'
import moment from 'moment'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            key: params.key || '',
            minPrice: params.minPrice || '',
            maxPrice: params.maxPrice || '',
            star: params.star || '',
            checkIn:
                params.checkIn || getDateString(new Date(moment())),
            checkOut:
                params.checkOut ||
                getDateString(new Date(moment().add(1, 'days')))
        }
    }, [location.search])
    const [keyword, setKeyword] = useState(() => queryParams.key)
    const handleOnchangeKeyWord = e => setKeyword(e.target.value)
    const [minPrice, setMinPrice] = useState(
        () => queryParams.minPrice
    )
    const handleOnchangeMinPrice = e => setMinPrice(e.target.value)
    const [maxPrice, setMaxPrice] = useState(
        () => queryParams.maxPrice
    )
    const handleOnchangeMaxPrice = e => setMaxPrice(e.target.value)
    const [checkIn, setCheckIn] = useState(() => new Date(queryParams.checkIn))
    const [checkOut, setCheckOut] = useState(
        new Date(queryParams.checkOut)
    )
    const ExampleCustomCheckIn = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer"
                onClick={onClick}
            >
                <span className="text-3xl">
                    <IoCalendarOutline />
                </span>
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
                className="flex-1 flex gap-3 items-center cursor-pointer"
                onClick={onClick}
            >
                <span className="text-3xl">
                    <IoCalendarOutline />
                </span>
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
    const handleSearchRestaurant = () => {
        const filters = {
            ...queryParams,
            key: keyword,
            minPrice: minPrice,
            maxPrice: maxPrice
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleChangeStar = star => {
        const filters = {
            ...queryParams,
            star: star
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
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
    return (
        <div className="w-full  border-slate-200 border rounded-lg px-2 py-2">
            <header className=" ml-2 font-semibold text-xl text-slate-500">
                Choose your favorite
            </header>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Name
                    </div>
                    <input
                        value={keyword}
                        onChange={handleOnchangeKeyWord}
                        placeholder="Search by name"
                        className="border  border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Check In
                    </div>
                    <ReactDatePicker
                        closeOnScroll={true}
                        selected={checkIn}
                        onChange={handleChangeCheckIn}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        customInput={<ExampleCustomCheckIn />}
                    />
                </div>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Check Out
                    </div>
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
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Min Price
                    </div>
                    <input
                        value={minPrice}
                        onChange={handleOnchangeMinPrice}
                        placeholder="1$"
                        className="border  border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>{' '}
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        MaxPrice
                    </div>
                    <input
                        value={maxPrice}
                        onChange={handleOnchangeMaxPrice}
                        placeholder="10000$"
                        className="border border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-4">
                        <div className="font-medium text-md ml-2">
                            Star
                        </div>
                        <div
                            onClick={() => handleChangeStar('')}
                            className=" hover:underline hover:text-blue-500 text-sm cursor-pointer"
                        >
                            All
                        </div>
                    </div>

                    <ul className=" text-2xl p-2">
                        <li
                            onClick={() => handleChangeStar(1)}
                            className=" text-yellow-400 flex gap-1 cursor-pointer"
                        >
                            <AiFillStar />
                        </li>
                        <li
                            onClick={() => handleChangeStar(2)}
                            className=" text-yellow-400 flex gap-1 cursor-pointer"
                        >
                            <AiFillStar />
                            <AiFillStar />
                        </li>
                        <li
                            onClick={() => handleChangeStar(3)}
                            className=" text-yellow-400 flex gap-1 cursor-pointer"
                        >
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </li>
                        <li
                            onClick={() => handleChangeStar(4)}
                            className=" text-yellow-400 flex gap-1 cursor-pointer"
                        >
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </li>
                        <li
                            onClick={() => handleChangeStar(5)}
                            className=" text-yellow-400 flex gap-1 cursor-pointer"
                        >
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 flex justify-center w-full items-center pb-4">
                <Mybutton
                    onClick={handleSearchRestaurant}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-2 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150 rounded-full"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">
                            <AiOutlineSearch />
                        </span>
                        <span>Search</span>
                    </div>
                </Mybutton>
            </div>
        </div>
    )
}

export default Sidebar
