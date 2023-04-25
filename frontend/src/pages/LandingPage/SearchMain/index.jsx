import Mybutton from '@components/MyButton'
import React from 'react'
import { IoLocationOutline, IoCalendarOutline } from 'react-icons/io5'
import {
    AiOutlineUsergroupDelete,
    AiOutlineSearch
} from 'react-icons/ai'
function SearchMain() {
    return (
        <div className="relative">
            <div className="flex bg-white w-[80%] lg:w-[40%] mx-auto rounded-full cursor-pointer font-medium mb-2 overflow-hidden">
                <div className=" basis-1/3 text-center border-r hover:bg-blue-500 p-2 hover:text-white">Hotels</div>
                <div className=" basis-1/3 text-center border-r hover:bg-blue-500 p-2 hover:text-white">Tours</div>
                <div className=" basis-1/3 text-center hover:bg-blue-500 p-2 hover:text-white">
                    Restaurants
                </div>
            </div>
            <div className="w-[90%] lg:w-[80%] flex border-2 mx-auto rounded-3xl lg:rounded-full items-center p-5 shadow border-slate-100 bg-white cursor-pointer z-10 gap-3 lg:gap-1 flex-col lg:flex-row">
                <div className="flex-1 flex gap-3 items-center lg:border-r w-full">
                    <span className="text-3xl">
                        <IoLocationOutline />
                    </span>
                    <div className="flex flex-col">
                        <div className="font-medium text-md">
                            Location
                        </div>
                        <input
                            className="text-gray-400 text-sm py-1 outline-none"
                            placeholder="Where are you going?"
                        />
                    </div>
                </div>
                <div className="flex-1 flex lg:border-r px-2 justify-between w-full">
                    <div className="flex-1 flex gap-3 items-center">
                        <span className="text-3xl">
                            <IoCalendarOutline />
                        </span>
                        <div className="flex flex-col">
                            <span className="font-medium text-md">
                                Check in
                            </span>
                            <span className="text-gray-400 text-sm">
                                Add date
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex gap-3 items-center">
                        <span className="text-3xl">
                            <IoCalendarOutline />
                        </span>
                        <div className="flex flex-col">
                            <span className="font-medium text-md">
                                Check out
                            </span>
                            <span className="text-gray-400 text-sm">
                                Add date
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex gap-3 items-center lg:border-r w-full">
                    <span className=" text-3xl">
                        <AiOutlineUsergroupDelete />
                    </span>
                    <div>
                        <div className="font-medium text-md">
                            Guests
                        </div>
                        <div className="text-gray-400 text-sm">
                            Add guests and rooms
                        </div>
                    </div>
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
        </div>
    )
}

export default SearchMain
