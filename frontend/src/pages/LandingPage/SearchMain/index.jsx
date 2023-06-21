import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import SearchHotel from './SearchHotel'
import SearchRestaurant from './SearchRestaurant'
import SearchDestination from './SearchDestination'
// type = 1 => Hotel
// type = 2 => Restaurant
// type = 3 => Tour
function SearchMain() {
    const provinces = useSelector(provincesSelector)
    const [type, setType] = useState(1)
    const [searchProvince, setSearchProvince] = useState({
        value: 9999,
        label: 'Where are you going?'
    })
    const [options, setOptions] = useState([])

    const handleOnChangeProvince = value => {
        setSearchProvince(value)
    }
    const handleSetType = type => setType(type)
    useEffect(() => {
        const _options = provinces.map(province => ({
            value: province.id,
            label: province.name
        }))
        _options.push({
            value: 9999,
            label: 'Where are you going?'
        })
        setOptions(_options)
    }, [provinces])
    return (
        <div className="relative">
            <div className="flex bg-white w-[80%] lg:w-[40%] mx-auto rounded-full cursor-pointer font-medium mb-2 overflow-hidden">
                <div
                    className={`${
                        type === 1 ? 'bg-blue-500 text-white ' : ''
                    }basis-1/3 text-center border-r hover:bg-blue-500 p-2 hover:text-white`}
                    onClick={() => handleSetType(1)}
                >
                    Hotels
                </div>

                <div
                    className={`${
                        type === 2 ? 'bg-blue-500 text-white ' : ''
                    }basis-1/3 text-center border-r hover:bg-blue-500 p-2 hover:text-white`}
                    onClick={() => handleSetType(2)}
                >
                    Restaurants
                </div>
                <div
                    className={`${
                        type === 3 ? 'bg-blue-500 text-white ' : ''
                    }basis-1/3 text-center border-r hover:bg-blue-500 p-2 hover:text-white`}
                    onClick={() => handleSetType(3)}
                >
                    Tours
                </div>
            </div>
            {type === 1 && (
                <SearchHotel
                    options={options}
                    searchProvince={searchProvince}
                    handleOnChangeProvince={handleOnChangeProvince}
                />
            )}
            {type === 2 && (
                <SearchRestaurant
                    options={options}
                    searchProvince={searchProvince}
                    handleOnChangeProvince={handleOnChangeProvince}
                />
            )}
            {type === 3 && (
                <SearchDestination
                    options={options}
                    searchProvince={searchProvince}
                    handleOnChangeProvince={handleOnChangeProvince}
                />
            )}
        </div>
    )
}

export default SearchMain
