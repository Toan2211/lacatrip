import Mybutton from '@components/MyButton'
import React from 'react'
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
function SearchDestination({
    options,
    searchProvince,
    handleOnChangeProvince
}) {
    return (
        <div className="w-[90%] lg:w-[60%] flex border-2 mx-auto rounded-3xl lg:rounded-full items-center p-5 shadow border-slate-100 bg-white cursor-pointer z-10 gap-3 lg:gap-1 flex-col lg:flex-row">
            <div className="flex-1 flex gap-3 items-center w-full">
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
            <div className="flex-1 flex gap-3 items-center w-full">
                <span className="text-3xl">
                    {/* <IoLocationOutline /> */}
                </span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2">
                        Name
                    </div>
                    <input className="border border-slate-200 outline-none px-2 py-1 rounded focus:border-blue-800 " />
                </div>
            </div>

            <div className="flex-1 flex justify-center w-full items-center">
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

export default SearchDestination