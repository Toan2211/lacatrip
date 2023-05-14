import Drawer from '@components/Drawer'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentDestinationSelector } from '../destination.slice'
import ItineraryForm from './ItineraryForm'

function Itinerary({ open, onClose }) {
    const currentDestination = useSelector(currentDestinationSelector)
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Manage itinerary of {currentDestination.name}
            </header>
            <div className="p-5">
                <ItineraryForm data={{}} onClose={onClose} />
            </div>
        </Drawer>
    )
}

export default Itinerary
