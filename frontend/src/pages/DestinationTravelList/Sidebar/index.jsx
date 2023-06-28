import Mybutton from '@components/MyButton'
import queryString from 'query-string'
import React, { useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router'

function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            key: params.key || '',
            minPrice: params.minPrice || '',
            maxPrice: params.maxPrice || '',
            fee: params.fee !== undefined ? params.fee : 1
        }
    }, [location.search])
    const [keyword, setKeyword] = useState(() => queryParams.key)
    const handleOnchangeKeyWord = e => setKeyword(e.target.value)
    const [minPrice, setMinPrice] = useState('')
    const handleOnchangeMinPrice = e => setMinPrice(e.target.value)
    const [maxPrice, setMaxPrice] = useState('')
    const handleOnchangeMaxPrice = e => setMaxPrice(e.target.value)
    const [fee, setFee] = useState(1)
    const handleSearch = () => {
        if (!fee) {
            setMinPrice(0)
            setMaxPrice(0)
        }
        else {
            if (!minPrice) setMinPrice('')
            if (!maxPrice) setMaxPrice('')
        }
        const filters = {
            ...queryParams,
            key: keyword,
            maxPrice: maxPrice,
            minPrice: minPrice
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleClickFee = type => {
        if (type !== fee) {
            setFee(type)
            const filters = {
                ...queryParams,
                fee: type,
                minPrice: type ? minPrice : 0,
                maxPrice: type ? maxPrice : 0
            }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    return (
        <div className="w-full  border-slate-200 border rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
                <header className=" ml-2 font-semibold text-xl text-slate-500">
                    Lọc theo sở thích của bạn
                </header>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Type Fee
                    </div>
                    <div className="flex  gap-10">
                        <label
                            htmlFor="fee"
                            onClick={() => handleClickFee(1)}
                            className=" cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id="fee"
                                className="mr-2"
                                checked={fee}
                            />
                            Trả phí
                        </label>
                        <label
                            htmlFor="notFee"
                            onClick={() => handleClickFee(0)}
                            className=" cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id="notFee"
                                className="mr-2"
                                checked={!fee}
                            />
                            Miễn phí
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Tên
                    </div>
                    <input
                        value={keyword}
                        onChange={handleOnchangeKeyWord}
                        placeholder="Tìm kiếm theo tên"
                        className="border  border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Giá khởi điểm
                    </div>
                    <input
                        value={minPrice}
                        onChange={handleOnchangeMinPrice}
                        placeholder="1$"
                        disabled={!fee}
                        className="border  border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>{' '}
            <div className="flex-1 flex gap-3 items-center w-full mb-4">
                <span className="text-3xl"></span>
                <div className="flex flex-col w-full">
                    <div className="font-medium text-md ml-2 mb-2">
                        Giá cao nhất
                    </div>
                    <input
                        value={maxPrice}
                        onChange={handleOnchangeMaxPrice}
                        placeholder="10000$"
                        disabled={!fee}
                        className="border border-slate-200 outline-none px-2 py-1 rounded-md focus:border-blue-800 "
                    />
                </div>
            </div>
            <div className="flex-1 flex justify-center w-full items-center pb-4">
                <Mybutton
                    onClick={handleSearch}
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-2 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150 rounded-full"
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

export default Sidebar
