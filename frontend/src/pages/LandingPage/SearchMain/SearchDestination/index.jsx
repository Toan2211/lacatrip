import Mybutton from '@components/MyButton'
import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router'
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
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const handleOnchangeKeyWord = e => setKeyword(e.target.value)
    const handleSearch = () => {
        if (searchProvince.value === 9999) return
        navigate(
            `/destination-travels/province/${searchProvince.value}?key=${keyword}`
        )
    }
    return (
        <div className="w-[90%] lg:w-[60%] flex border-2 mx-auto rounded-3xl lg:rounded-full items-center p-5 shadow border-slate-100 bg-white cursor-pointer z-10 gap-3 lg:gap-1 flex-col lg:flex-row">
            <div className="flex-1 flex gap-3 items-center w-full">
                <span className="text-3xl">
                    <IoLocationOutline />
                </span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2">
                        Địa điểm
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
                <span className="text-2xl mt-5 text-slate-400">
                    <BsSearch />
                </span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2">
                        Tên tour du lịch
                    </div>
                    <input
                        value={keyword}
                        onChange={handleOnchangeKeyWord}
                        className="border border-slate-200 outline-none px-2 py-1 rounded-full focus:border-blue-800 "
                    />
                </div>
            </div>

            <div className="flex-1 flex justify-center w-full items-center">
                <Mybutton
                    onClick={handleSearch}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-3 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150 rounded-full"
                >
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">
                            <AiOutlineSearch />
                        </span>
                        <span>Tìm kiếm</span>
                    </div>
                </Mybutton>
            </div>
        </div>
    )
}

export default SearchDestination
