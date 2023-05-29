import Drawer2 from '@components/Drawer2'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import { HOTELTYPE } from '@constants/instanceType'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    DESTINATIONTYPE,
    RESTAURANTTYPE
} from '@constants/instanceType'

function TripListItem({
    isOpen,
    onClose,
    dataOfDate,
    handleUpdateDataOfDate
}) {
    const [dataLocal, setDataLocal] = useState()
    const [listCheckedHotel, setListCheckedHotel] = useState([])
    const [listCheckedRestaurant, setListCheckedRestaurant] =
        useState([])
    const [listCheckedDestination, setListCheckedDestination] =
        useState([])
    const currentTrip = useSelector(currentTripSelector)
    const handleOnChangeCheckbox = (e, type, position) => {
        const { value, checked } = e.target
        if (type === HOTELTYPE)
            setListCheckedHotel(prev =>
                prev.map((item, index) =>
                    position === index ? !item : item
                )
            )
        else if (type === RESTAURANTTYPE)
            setListCheckedRestaurant(prev =>
                prev.map((item, index) =>
                    position === index ? !item : item
                )
            )
        else if (type === DESTINATIONTYPE)
            setListCheckedDestination(prev =>
                prev.map((item, index) =>
                    position === index ? !item : item
                )
            )
        if (checked)
            setDataLocal(prev => [
                ...prev,
                {
                    instanceId: value,
                    type: type
                }
            ])
        else
            setDataLocal(prev =>
                prev.filter(x => x.instanceId !== value)
            )
    }
    const handleOnSaveClick = () => {
        const data = {
            ...dataOfDate,
            itineraries: [...dataLocal]
        }
        handleUpdateDataOfDate(data)
        onClose()
    }
    useEffect(() => {
        setDataLocal(dataOfDate.itineraries)
        if (dataOfDate.itineraries.length === 0) {
            setListCheckedHotel(
                new Array(currentTrip.hotels.length).fill(false)
            )
            setListCheckedDestination(
                new Array(currentTrip.destinationTravels.length).fill(
                    false
                )
            )
            setListCheckedRestaurant(
                new Array(currentTrip.restaurants.length).fill(false)
            )
        } else {
            // hotel
            const listCheckedHotelAdd = []
            for (const hotel of currentTrip.hotels) {
                const item = dataOfDate.itineraries.find(
                    x => x.instanceId === hotel.id
                )
                if (item) listCheckedHotelAdd.push(true)
                else listCheckedHotelAdd.push(false)
            }
            setListCheckedHotel(listCheckedHotelAdd)
            // restaurant
            const listCheckRestaurantCheckedAdd = []
            for (const restaurant of currentTrip.restaurants) {
                const item = dataOfDate.itineraries.find(
                    x => x.instanceId === restaurant.id
                )
                if (item) listCheckRestaurantCheckedAdd.push(true)
                else listCheckRestaurantCheckedAdd.push(false)
            }
            setListCheckedRestaurant(listCheckRestaurantCheckedAdd)
            // destination
            const listDestinationCheckedAdd = []
            for (const destinationTravel of currentTrip.destinationTravels) {
                const item = dataOfDate.itineraries.find(
                    x => x.instanceId === destinationTravel.id
                )
                if (item) listDestinationCheckedAdd.push(true)
                else listDestinationCheckedAdd.push(false)
            }
            setListCheckedDestination(listDestinationCheckedAdd)
        }
    }, [dataOfDate, currentTrip])
    return (
        <Drawer2 isOpen={isOpen} onClose={onClose}>
            <div className="w-full h-[300vh] pb-[500px] z-100">
                <div className=" mt-[80px] h-[60px] bg-slate-50 flex justify-between px-3 py-3 mb-3">
                    <div className="font-semibold">
                        Trip List Item
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleOnSaveClick}
                            className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className=" bg-gray-300 text-white active:bg-gray-400 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="">
                    {currentTrip.hotels.length > 0 && (
                        <div>
                            <header className="w-full bg-slate-50 px-3 py-2 font-semibold">
                                Hotels
                            </header>
                            <ul>
                                {currentTrip.hotels.map(
                                    (hotel, index) => (
                                        <li
                                            key={hotel.id}
                                            className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                        >
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        listCheckedHotel[
                                                            index
                                                        ]
                                                    }
                                                    id={hotel.id + dataOfDate.date}
                                                    value={hotel.id}
                                                    onChange={e =>
                                                        handleOnChangeCheckbox(
                                                            e,
                                                            HOTELTYPE,
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="flex flex-col cursor-pointer flex-1 w-full"
                                                htmlFor={hotel.id + dataOfDate.date}
                                            >
                                                <span className="text-sm font-semibold">
                                                    {hotel.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {hotel.address}
                                                </span>
                                            </label>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                    {currentTrip.restaurants.length > 0 && (
                        <div>
                            <header className="w-full bg-slate-50 px-3 py-2 font-semibold">
                                Restaurants
                            </header>
                            <ul>
                                {currentTrip.restaurants.map(
                                    (restaurant, index) => (
                                        <li
                                            key={restaurant.id}
                                            className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                        >
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={restaurant.id + dataOfDate.date}
                                                    checked={
                                                        listCheckedRestaurant[
                                                            index
                                                        ]
                                                    }
                                                    value={
                                                        restaurant.id
                                                    }
                                                    onChange={e =>
                                                        handleOnChangeCheckbox(
                                                            e,
                                                            RESTAURANTTYPE,
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="flex flex-col cursor-pointer flex-1 w-full"
                                                htmlFor={
                                                    restaurant.id + dataOfDate.date
                                                }
                                            >
                                                <span className="text-sm font-semibold">
                                                    {restaurant.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {
                                                        restaurant.address
                                                    }
                                                </span>
                                            </label>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                    {currentTrip.destinationTravels.length > 0 && (
                        <div>
                            <header className="w-full bg-slate-50 px-3 py-2 font-semibold">
                                Destination Travels
                            </header>
                            <ul>
                                {currentTrip.destinationTravels.map(
                                    (destinationTravel, index) => (
                                        <li
                                            key={destinationTravel.id}
                                            className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                        >
                                            <div className="">
                                                <input
                                                    type="checkbox"
                                                    id={
                                                        destinationTravel.id + dataOfDate.date
                                                    }
                                                    checked={
                                                        listCheckedDestination[
                                                            index
                                                        ]
                                                    }
                                                    value={
                                                        destinationTravel.id
                                                    }
                                                    onChange={e =>
                                                        handleOnChangeCheckbox(
                                                            e,
                                                            DESTINATIONTYPE,
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="flex flex-col cursor-pointer flex-1 w-full"
                                                htmlFor={
                                                    destinationTravel.id + dataOfDate.date
                                                }
                                            >
                                                <span className="text-sm font-semibold">
                                                    {
                                                        destinationTravel.name
                                                    }
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {
                                                        destinationTravel.address
                                                    }
                                                </span>
                                            </label>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Drawer2>
    )
}

export default TripListItem
