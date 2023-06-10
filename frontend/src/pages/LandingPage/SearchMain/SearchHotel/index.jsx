import Mybutton from '@components/MyButton'
import React, { forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import {
    AiOutlineSearch,
    AiOutlineUsergroupDelete
} from 'react-icons/ai'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'
import Select from 'react-select'
const style = {
    control: base => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none'
    })
}
function SearchHotel({
    options,
    searchProvince,
    handleOnChangeProvince
}) {
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [showGuest, setShowGuest] = useState(false)
    const [countRooms, setCountRooms] = useState(1)
    const [countAdults, setCountAdults] = useState(1)
    const [countChildrens, setCountChildrens] = useState(0)
    const ExampleCustomCheckIn = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center"
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
                className="flex-1 flex gap-3 items-center"
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
    return (
        <div className="w-[90%] lg:w-[80%] flex border-2 mx-auto rounded-3xl lg:rounded-full items-center p-5 shadow border-slate-100 bg-white cursor-pointer z-10 gap-3 lg:gap-1 flex-col lg:flex-row">
            <div className="flex-1 flex gap-3 items-center lg:border-r w-full">
                <span className="text-3xl">
                    <IoLocationOutline />
                </span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2">
                        Location
                    </div>
                    <Select
                        styles={style}
                        placeholder={'Where are you going?'}
                        options={options}
                        value={searchProvince}
                        onChange={handleOnChangeProvince}
                        className="text-sm outline-none w-[80%] border-none"
                    />
                </div>
            </div>
            <div className="flex-1 flex lg:border-r px-2 justify-between w-full">
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
            <div className="flex-1 flex gap-3 items-center lg:border-r w-full relative">
                <span
                    className=" text-3xl"
                    onClick={() => setShowGuest(!showGuest)}
                >
                    <AiOutlineUsergroupDelete />
                </span>
                <div onClick={() => setShowGuest(!showGuest)}>
                    <div className="font-medium text-md">Guests</div>
                    <div className="text-gray-400 text-sm">
                        Add guests and rooms
                    </div>
                </div>
                {showGuest && (
                    <div className="absolute w-full h-[200px] bg-white top-[80px] shadow-lg p-4 rounded-md border border-gray-200 text-gray-600">
                        <div className="flex px-3 justify-between items-center border-b border-slate-200 py-3">
                            <div className="font-medium text-xl">
                                Rooms
                            </div>
                            <div className="flex gap-2">
                                <div
                                    onClick={() =>
                                        handleDownCount('rooms')
                                    }
                                    className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                >
                                    <span className="mb-1">-</span>
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
                                    <span className="mb-1">+</span>
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
                                        handleDownCount('adults')
                                    }
                                    className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                >
                                    <span className="mb-1">-</span>
                                </div>
                                <div className=" font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                                    <span>{countAdults}</span>
                                </div>
                                <div
                                    className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                    onClick={() =>
                                        handleUpCount('adults')
                                    }
                                >
                                    <span className="mb-1">+</span>
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
                                        handleDownCount('childrens')
                                    }
                                    className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                >
                                    <span className="mb-1">-</span>
                                </div>
                                <div className=" font-medium rounded-full text-xl flex justify-center items-center w-[30px]">
                                    <span>{countChildrens}</span>
                                </div>
                                <div
                                    className=" font-bold rounded-full border border-black w-8 h-8 text-2xl flex justify-center items-center hover:bg-blue-600 hover:text-white hover:border-blue-600"
                                    onClick={() =>
                                        handleUpCount('childrens')
                                    }
                                >
                                    <span className="mb-1">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-1 flex justify-center w-full">
                <Mybutton className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-3 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150 rounded-full">
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

export default SearchHotel
