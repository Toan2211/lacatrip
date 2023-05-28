import Drawer2 from '@components/Drawer2'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import React from 'react'
import { useSelector } from 'react-redux'

function TripListItem({ isOpen, onClose, sheet }) {
    const currentTrip = useSelector(currentTripSelector)
    return (
        <Drawer2 isOpen={isOpen} onClose={onClose}>
            <div className="w-full h-[300vh] pb-[500px] z-100">
                <div className=" mt-[80px] h-[60px] bg-slate-50 flex justify-between px-3 py-3 mb-3">
                    <div className="font-semibold">
                        Trip List Item
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
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
                                {currentTrip.hotels.map(hotel => (
                                    <li
                                        key={hotel.id}
                                        className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                    >
                                        <div>
                                            <input
                                                type="checkbox"
                                                id={hotel.id}
                                            />
                                        </div>
                                        <label
                                            className="flex flex-col cursor-pointer flex-1 w-full"
                                            htmlFor={hotel.id}
                                        >
                                            <span className="text-sm font-semibold">
                                                {hotel.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {hotel.address}
                                            </span>
                                        </label>
                                    </li>
                                ))}
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
                                    restaurant => (
                                        <li
                                            key={restaurant.id}
                                            className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                        >
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={restaurant.id}
                                                />
                                            </div>
                                            <label
                                                className="flex flex-col cursor-pointer flex-1 w-full"
                                                htmlFor={
                                                    restaurant.id
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
                                    destinationTravel => (
                                        <li
                                            key={destinationTravel.id}
                                            className="flex gap-3 cursor-pointer hover:bg-slate-50 py-2 min-h-[60px] items-center my-2 px-4"
                                        >
                                            <div className=''>
                                                <input
                                                    type="checkbox"
                                                    id={
                                                        destinationTravel.id
                                                    }
                                                />
                                            </div>
                                            <label
                                                className="flex flex-col cursor-pointer flex-1 w-full"
                                                htmlFor={
                                                    destinationTravel.id
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
