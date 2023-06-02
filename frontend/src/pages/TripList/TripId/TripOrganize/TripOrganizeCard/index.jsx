import React, { useState } from 'react'
import TripListItem from '../TripListItem'
import { useSelector } from 'react-redux'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import { HOTELTYPE, RESTAURANTTYPE } from '@constants/instanceType'
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
// date.toLocaleDateString('en-US', options)
function TripOrganizeCard({ dataOfDate, handleUpdateDataOfDate }) {
    const currentTrip = useSelector(currentTripSelector)
    const [listItemOpen, setListItemOpen] = useState(false)
    const onCloseListItem = () => setListItemOpen(false)
    const handleAddItem = () => {
        setListItemOpen(true)
    }
    return (
        <>
            <div className="my-2 w-[97%]">
                <div className="bg-slate-50 min-h-16 border-slate-300 border-[1px] p-2 cursor-pointer shadow-sm">
                    <div className="flex justify-between">
                        <header className="font-semibold mb-3">
                            {dataOfDate.date
                                ? new Date(
                                    dataOfDate.date
                                ).toLocaleDateString(
                                    'en-US',
                                    options
                                )
                                : 'Unschedule'}
                        </header>
                        <span
                            className="font-semibold text-sm hover:text-blue-500"
                            onClick={handleAddItem}
                        >
                            Add item
                        </span>
                    </div>
                    {dataOfDate.itineraries.map(item => {
                        let instance = null
                        if (item.type === HOTELTYPE) {
                            instance = currentTrip.hotels.find(
                                i => i.id === item.instanceId
                            )
                        } else if (item.type === RESTAURANTTYPE)
                            instance = currentTrip.restaurants.find(
                                i => i.id === item.instanceId
                            )
                        else
                            instance =
                                currentTrip.destinationTravels.find(
                                    i => i.id === item.instanceId
                                )
                        return (
                            <div
                                key={instance.instanceId}
                                className="border-slate-300 border-[1px] p-4 rounded-md flex justify-between items-center my-1 shadow-sm bg-slate-100"
                            >
                                <span className="font-semibold text-sm">
                                    {instance.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <TripListItem
                isOpen={listItemOpen}
                onClose={onCloseListItem}
                dataOfDate={dataOfDate}
                handleUpdateDataOfDate={handleUpdateDataOfDate}
            />
        </>
    )
}

export default TripOrganizeCard
