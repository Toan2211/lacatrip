import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'

function TripCard({ trip }) {
    return (
        <NavLink
            to={`/trip/${trip.id}`}
            className="overflow-hidden rounded-2xl bg-white flex flex-col h-[300px] cursor-pointer group"
        >
            <div className=" overflow-hidden rounded-xl">
                <img
                    className="h-[200px] w-full object-cover group-hover:scale-125 transition-transform rounded-xl"
                    src={trip.image}
                />
            </div>
            <div className="p-2 flex-1">
                <div className="flex flex-col pb-2">
                    <span className="font-semibold line-clamp-2">
                        {trip.name}
                    </span>
                </div>
                <div className="flex text-sm text-gray-400 gap-2">
                    <span className="block w-6 h-6 rounded-full overflow-hidden">
                        <img
                            src={
                                trip?.user?.avatar ||
                                'https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImage/ItdeP0WWcQ6NhVHGPJIPDFtU36du76JG'
                            }
                            className="w-full h-full object-cover rounded-full"
                        />
                    </span>
                    <span>•</span>
                    {trip.startDate && (
                        <>
                            <span>
                                {moment(new Date(trip.startDate)).format('DD/MM/YYYY')} –{' '}
                                {moment(new Date(trip.endDate)).format('DD/MM/YYYY')}
                            </span>{' '}
                            <span>•</span>
                        </>
                    )}
                    <span>
                        {trip.hotels.length +
                            trip.restaurants.length +
                            trip.destinationTravels.length}{' '}
                        places
                    </span>
                </div>
            </div>
        </NavLink>
    )
}

export default TripCard
