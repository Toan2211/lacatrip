import Drawer from '@components/Drawer'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentDestinationSelector,
    getDestinations
} from '../destination.slice'
import ItineraryForm from './ItineraryForm'
import { setCurrentItinerary } from '../itinerary.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { Container, Draggable } from 'react-smooth-dnd'

function Itinerary({ open, onClose, sheet }) {
    const currentDestination = useSelector(currentDestinationSelector)
    const [itineraryData, setItineraryData] = useState({})
    const [showForm, setShowForm] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            setShowForm(false)
        }
    }, [sheet])
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || '',
            provinceId: params.provinceId || null,
            serviceManagerId: params.serviceManagerId || '',
            corpTourId: params.corpTourId || ''
        }
    }, [location.search])
    const profile = useSelector(selectUser)
    const handleGetAllDestinations = () => {
        if (profile.serviceManagerId)
            dispatch(
                getDestinations({
                    ...queryParams,
                    serviceManagerId: profile.serviceManagerId
                })
            )
        else dispatch(getDestinations({ ...queryParams }))
    }
    const onDropItinerary = (result) => {
        console.log(result)
    }
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Manage itinerary of {currentDestination.name}
            </header>
            <div className="p-5">
                {currentDestination &&
                    currentDestination?.itineraries?.length > 0 && (
                    <Container
                        // {...column.props}
                        // groupName="column"
                        onDrop={onDropItinerary}
                        getChildPayload={index =>
                            currentDestination.itineraries[index]
                        }
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        // onDropReady={p => console.log('Drop ready: ', p)}
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {currentDestination.itineraries.map(
                            (itinerary, index) => (
                                <Draggable key={index}>
                                    <div
                                        key={itinerary.id}
                                        className="w-full bg-slate-100 hover:bg-slate-200 font-medium mb-3 p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                                    >
                                        <span>
                                            {itinerary.title}
                                        </span>
                                        <div>
                                            <div className="group relative text-2xl">
                                                <button className="bg-gray-300 text-gray-700 rounded inline-flex items-center group">
                                                    <svg
                                                        className="fill-current h-4 w-4 group-hover:rotate-180 transition-transform"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </button>
                                                <ul className="rounded absolute hidden text-gray-700 pt-1 group-hover:block w-20 right-1 text-sm overflow-hidden z-auto">
                                                    <li
                                                        className="bg-gray-200 hover:bg-gray-400 cursor-pointer p-1 rounded"
                                                        onClick={() => {
                                                            setItineraryData(
                                                                itinerary
                                                            )
                                                            setCurrentItinerary(
                                                                itinerary
                                                            )
                                                            setShowForm(
                                                                true
                                                            )
                                                        }}
                                                    >
                                                        Update
                                                    </li>
                                                    <li className="bg-gray-200 hover:bg-gray-400 cursor-pointer p-1 rounded">
                                                        Delete
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Draggable>
                            )
                        )}
                    </Container>
                )}
                {showForm && (
                    <ItineraryForm
                        data={itineraryData}
                        onClose={onClose}
                        handleGetAllDestinations={
                            handleGetAllDestinations
                        }
                    />
                )}
            </div>
        </Drawer>
    )
}

export default Itinerary
