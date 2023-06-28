import Mybutton from '@components/MyButton'
import React, { forwardRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentDestinationClientSelector } from '../destinationclient.slice'
import { AiFillStar } from 'react-icons/ai'
import { getDateString } from '@utils/getDateString'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import queryString from 'query-string'
import { useNavigate } from 'react-router'
import { path } from '@constants/path'

function SearchDestinationForm() {
    const currentDestination = useSelector(
        currentDestinationClientSelector
    )
    const navigate = useNavigate()
    const [people, setPeople] = useState(1)
    const [date, setDate] = useState(
        new Date(moment().add(1, 'days'))
    )
    const handleDownPeople = () => {
        if (people <= 1) return
        setPeople(prev => prev - 1)
    }
    const ExampleCustomDate = forwardRef(({ onClick }, ref) => (
        <div className="" onClick={onClick}>
            <div className="flex flex-col">
                <button className="bg-gray-300 text-gray-700 rounded inline-flex items-center">
                    <svg
                        className="fill-current h-4 w-4  transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
            </div>
        </div>
    ))
    const handleBookingDestinationTravel = () => {
        const params = {
            countPeople: people,
            destinationTravelId: currentDestination.id,
            date: getDateString(date)
        }
        navigate(
            `${path.bookingDestiantionTravel}?${queryString.stringify(
                params
            )}`
        )
    }
    return (
        <div className=" border-gray-100 shadow-md border-1 lg:w-[30vw] w-full h-[50vh] border-[1px] px-5 py-10 rounded-2xl">
            <div className="px-4 pb-4 flex justify-between items-center">
                <div className="mt-4">
                    <span className="font-normal text-gray-400">
                        Giá chỉ:
                    </span>
                    <span className="font-bold text-xl">
                        ${currentDestination.price}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <div className=" text-yellow-400 flex gap-1">
                        <span>
                            <AiFillStar />
                        </span>
                    </div>
                    <span className="font-normal text-gray-400">
                        {currentDestination.rating}{' '}
                    </span>
                    <span className="font-normal text-gray-400">
                        ({currentDestination.totalRating} Đánh giá)
                    </span>
                </div>
            </div>
            <div className="border-gray-100 border-[1px] rounded-2xl w-full overflow-hidden">
                <div className="border-gray-100 border-[1px] w-full px-4 py-2 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className=" font-medium text-md">
                            Ngày đặt lịch
                        </span>
                        <span className="text-sm">
                            {getDateString(date)}
                        </span>
                    </div>
                    <div>
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={date}
                            onChange={date => setDate(date)}
                            customInput={<ExampleCustomDate />}
                            minDate={
                                new Date(moment().add(1, 'days'))
                            }
                        />
                    </div>
                </div>
                <div className="border-gray-100 border-[1px] w-full px-4 py-2 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className=" font-medium text-md">
                            Số người
                        </span>
                        <span className="text-sm">{people}</span>
                    </div>
                    <div className="flex gap-3">
                        <div
                            onClick={handleDownPeople}
                            className="overflow-hidden font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                        >
                            <span className="mb-1">-</span>
                        </div>
                        <div className="overflow-hidden font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                            <span>{people}</span>
                        </div>
                        <div
                            onClick={() =>
                                setPeople(prev => prev + 1)
                            }
                            className="overflow-hidden font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
                        >
                            <span className="mb-1">+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold text-2xl mt-5">
                <span>Tổng tiền</span>
                <span>${currentDestination.price * people}</span>
            </div>
            <div className="text-center mt-4">
                <Mybutton
                    onClick={handleBookingDestinationTravel}
                    className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-3/4 ease-linear transition-all duration-150"
                >
                    Đặt lịch ngay
                </Mybutton>
            </div>
        </div>
    )
}

export default SearchDestinationForm
