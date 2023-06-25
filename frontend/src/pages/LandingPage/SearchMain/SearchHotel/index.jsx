import Mybutton from '@components/MyButton'
import React, { forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import Select from 'react-select'
import { getDateString } from '@utils/getDateString'
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
    const navigate = useNavigate()
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
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
    const handleSearch = () => {
        if (searchProvince.value === 9999) return
        navigate(
            `/hotels/province/${
                searchProvince.value
            }?checkIn=${getDateString(
                checkIn
            )}&checkOut=${getDateString(checkOut)}`
        )
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
                    minDate={new Date()}
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

            <div className="flex-1 flex justify-center w-full">
                <Mybutton
                    onClick={handleSearch}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-3 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150 rounded-full"
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

export default SearchHotel
