import Mybutton from '@components/MyButton'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router'

function Sidebar() {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const handleOnchangeKeyWord = e => setKeyword(e.target.value)
    const [minPrice, setMinPrice] = useState('')
    const handleOnchangeMinPrice = e => setMinPrice(e.target.value)
    const [maxPrice, setMaxPrice] = useState('')
    const handleOnchangeMaxPrice = e => setMaxPrice(e.target.value)
    const handleSearchRestaurant = () => {
        navigate(
            `?key=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        )
    }
    const clearAllFilter = () => {
        setKeyword('')
        setMinPrice('')
        setMaxPrice('')
        navigate(
            '?key=&minPrice=&maxPrice='
        )
    }
    return (
        <div className="w-full  border-slate-200 border rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
                <header className=" ml-2 font-semibold text-xl text-slate-500">
                    Choose your favorite
                </header>
                <div
                    onClick={clearAllFilter}
                    className=" text-sm hover:underline cursor-pointer hover:text-blue-400"
                >
                    Clear all
                </div>
            </div>
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
                        Min Price
                    </div>
                    <input
                        value={minPrice}
                        onChange={handleOnchangeMinPrice}
                        placeholder="Search by name"
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
                        placeholder="Search by name"
                        className="border border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
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
