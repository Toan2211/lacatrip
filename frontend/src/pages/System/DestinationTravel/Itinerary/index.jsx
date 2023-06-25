import Drawer from '@components/Drawer'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    currentDestinationSelector,
    getDestinations,
    getDetail,
    setCurrentDestination
} from '../destination.slice'
import ItineraryForm from './ItineraryForm'
import {
    deleteItinerary,
    setCurrentItinerary,
    updateItinerary
} from '../itinerary.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '@utils/dragDrop'
import Mybutton from '@components/MyButton'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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
            serviceManagerId: params.serviceManagerId || ''
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
    const onDropItinerary = result => {
        const itineraryDrag = applyDrag(
            currentDestination.itineraries,
            result
        )
        const destination = {
            ...currentDestination,
            itineraries: [...itineraryDrag]
        }
        dispatch(setCurrentDestination(destination))
    }
    const addNewItinerary = () => {
        setItineraryData({})
        setShowForm(!showForm)
    }
    const updateItineary = async data => {
        const formdata = new FormData()
        formdata.append('title', data.title)
        formdata.append('description', data.description)
        formdata.append('address', data.address)
        formdata.append('longtitude', data.longtitude)
        formdata.append('latitude', data.latitude)
        formdata.append('step', data.step)
        formdata.append('destinationTravelId', currentDestination.id)
        formdata.append('image', data.image)
        formdata.append('id', data.id)
        await dispatch(updateItinerary(formdata)).then(res =>
            unwrapResult(res)
        )
    }
    const handleUpdateStep = async () => {
        const itineraries = [...currentDestination.itineraries]
        for (let itinerary of itineraries) {
            const index = itineraries.findIndex(
                value => value.id === itinerary.id
            )
            if (itinerary.step !== index + 1) {
                const dataUpdate = {
                    ...itinerary,
                    step: index + 1
                }
                await updateItineary(dataUpdate)
            }
        }
        await dispatch(getDetail(currentDestination.id))
        await dispatch(getDestinations(queryParams))
        toast.success('Update step itinerary successfully', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1000,
            hideProgressBar: true
        })
    }
    const handleDeleteItinerary = async idItinerary => {
        try {
            await dispatch(deleteItinerary(idItinerary)).then(res =>
                unwrapResult(res)
            )
            const itineraries = [...currentDestination.itineraries]
            const index = itineraries.findIndex(
                value => value.id === idItinerary
            )
            itineraries.splice(index, 1)
            dispatch(
                setCurrentDestination({
                    ...currentDestination,
                    itineraries: [...itineraries]
                })
            )
            for (let itinerary of itineraries) {
                const index = itineraries.findIndex(
                    value => value.id === itinerary.id
                )
                if (itinerary.step !== index + 1) {
                    const dataUpdate = {
                        ...itinerary,
                        step: index + 1
                    }
                    await updateItineary(dataUpdate)
                }
            }
            await dispatch(getDetail(currentDestination.id))
            await dispatch(getDestinations(queryParams))
            toast.success('Delete itinerary successfully', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Manage itinerary of {currentDestination.name}
            </header>
            <div className="p-5">
                {currentDestination?.itineraries?.length > 0 && (
                    <div className="text-right">
                        <Mybutton
                            onClick={handleUpdateStep}
                            type="button"
                            className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/3 ease-linear transition-all duration-150"
                        >
                            Update Step
                        </Mybutton>
                    </div>
                )}

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
                                                    <ul className="rounded absolute hidden pt-1 group-hover:block w-20 right-[16px] bottom-[-10px] text-sm overflow-hidden z-auto">
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
                                                        <li
                                                            className="bg-gray-200 hover:bg-gray-400 cursor-pointer p-1 rounded"
                                                            onClick={() =>
                                                                handleDeleteItinerary(
                                                                    itinerary.id
                                                                )
                                                            }
                                                        >
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
                <div className="text-right">
                    <Mybutton
                        onClick={addNewItinerary}
                        type="button"
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-1 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/3 ease-linear transition-all duration-150"
                    >
                        Add new Itinerary
                    </Mybutton>
                </div>
                {showForm && (
                    <ItineraryForm
                        data={itineraryData}
                        onClose={() => {
                            setItineraryData({})
                            setShowForm(false)
                        }}
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
