import Drawer2 from '@components/Drawer2'
import React, { forwardRef, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import TripOrganizeCard from './TripOrganizeCard'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import { updateTrip } from '@pages/TripList/trip.slice'
import { getDates } from '@utils/getDates'
import moment from 'moment/moment'
import { updateItineraries } from '@pages/TripList/trip.slice'
import {
    DESTINATIONTYPE,
    RESTAURANTTYPE,
    HOTELTYPE
} from '@constants/instanceType'
import _ from 'lodash'

function TripOrganize({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const currentTrip = useSelector(currentTripSelector)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [dataItineraries, setDataItineraries] = useState([])
    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex items-center gap-2 border-[1px] border-slate-300 rounded-lg px-4 cursor-pointer w-[160px]"
                onClick={onClick}
            >
                <span>
                    <MdOutlineCalendarMonth />
                </span>
                <div className="flex flex-col">
                    <span className="font-semibold">Ngày bắt đầu</span>
                    <span
                        className="cursor-pointer text-sm font-semibold"
                        ref={ref}
                    >
                        {value}
                    </span>
                </div>
            </div>
        )
    )
    const ExampleCustomInputEndDate = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex items-center gap-2 border-[1px] border-slate-300 rounded-lg px-4 cursor-pointer w-[160px]"
                onClick={onClick}
            >
                <span>
                    <MdOutlineCalendarMonth />
                </span>
                <div className="flex flex-col">
                    <span className="font-semibold">Ngày kết thúc</span>
                    <span
                        className="cursor-pointer text-sm font-semibold"
                        ref={ref}
                    >
                        {value}
                    </span>
                </div>
            </div>
        )
    )
    const handleUpdate = async () => {
        try {
            if (startDate > endDate) return
            const formData = new FormData()
            formData.append('id', currentTrip.id)
            formData.append('startDate', startDate)
            formData.append('endDate', endDate)
            await dispatch(updateTrip(formData))
            const itinerariesUpdate = []
            for (const data of dataItineraries) {
                if (data.itineraries.length > 0) {
                    itinerariesUpdate.push({
                        date: data.date,
                        instances: [...data.itineraries]
                    })
                }
            }
            const data = {
                tripId: currentTrip.id,
                itineraries: itinerariesUpdate
            }
            await dispatch(updateItineraries(data))
            onClose()
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    useEffect(() => {
        const rawDataFromDate = getDates(startDate, endDate).map(
            data => ({
                date: moment(data).format('YYYY-MM-DD'),
                itineraries: []
            })
        )
        for (const tripDate of currentTrip.tripDates) {
            const tripDateInRaw = rawDataFromDate.find(
                tripDateItem =>
                    tripDateItem.date === tripDate.date.split('T')[0]
            )
            if (_.isEmpty(tripDateInRaw)) break
            for (const des of tripDate.destinationTravels)
                tripDateInRaw.itineraries.push({
                    instanceId: des.id,
                    type: DESTINATIONTYPE
                })
            for (const res of tripDate.restaurants)
                tripDateInRaw.itineraries.push({
                    instanceId: res.id,
                    type: RESTAURANTTYPE
                })
            for (const hotel of tripDate.hotels)
                tripDateInRaw.itineraries.push({
                    instanceId: hotel.id,
                    type: HOTELTYPE
                })
        }
        setDataItineraries(rawDataFromDate)

    }, [startDate, endDate, currentTrip])
    useEffect(() => {
        if (currentTrip.startDate) {
            setStartDate(new Date(currentTrip.startDate))
            setEndDate(new Date(currentTrip.endDate))
        }
    }, [currentTrip])
    const handleUpdateDataOfDate = dataOfDateToUpdate => {
        const indexTripDated = dataItineraries.findIndex(
            item => item.date === dataOfDateToUpdate.date
        )
        const dataItinerariesUpdate = [...dataItineraries]
        dataItinerariesUpdate.splice(
            indexTripDated,
            1,
            dataOfDateToUpdate
        )
        setDataItineraries(dataItinerariesUpdate)
    }
    const handleCancel = () => {
        setStartDate(new Date(currentTrip.startDate))
        setEndDate(new Date(currentTrip.endDate))
        onClose()
    }
    return (
        <Drawer2 isOpen={isOpen} onClose={onClose}>
            <div className="w-full h-[300vh] pb-[500px]">
                <div className=" mt-[80px] h-[60px] bg-slate-50 flex justify-between px-3 py-3">
                    <div className="font-semibold">
                        Hành trình của bạn
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={handleCancel}
                            className=" bg-gray-300 text-white active:bg-gray-400 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                            Bỏ
                        </button>
                    </div>
                </div>
                <div>
                    <div className="flex w-full items-center px-4 justify-between border-b-[1px] border-slate-200 py-4">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            customInput={<ExampleCustomInput />}
                        />
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            customInput={
                                <ExampleCustomInputEndDate />
                            }
                        />
                    </div>
                </div>
                {dataItineraries.map((item, index) => (
                    <TripOrganizeCard
                        key={index}
                        dataOfDate={item}
                        handleUpdateDataOfDate={
                            handleUpdateDataOfDate
                        }
                    />
                ))}
            </div>
        </Drawer2>
    )
}

export default TripOrganize
