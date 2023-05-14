import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
    createItinerary,
    currentItinerarySelector,
    updateItinerary
} from '../../itinerary.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import InputField from '@components/InputField'
import TextArea from '@components/TextArea'
import AddressGenMap from '@components/AddressGenMap'
import Mybutton from '@components/MyButton'
import OnePhotoUpload from '@components/OnePhotoUpload'
import _ from 'lodash'
import { currentDestinationSelector } from '../../destination.slice'
function ItineraryForm({ data, onClose }) {
    const dispatch = useDispatch()
    const currenDestination = useSelector(currentDestinationSelector)
    const currentItinerary = useSelector(currentItinerarySelector)
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            address: '',
            longtitude: '',
            latitude: '',
            step: null,
            image: ''
        }
    })
    useEffect(() => {
        if (!_.isEmpty(currentItinerary)) {
            form.setValue('title', currentItinerary.title)
            form.setValue('description', currentItinerary.description)
            form.setValue('address', currentItinerary.address)
            form.setValue('longtitude', currentItinerary.longtitude)
            form.setValue('latitude', currentItinerary.latitude)
            form.setValue('step', currentItinerary.step)
            form.setValue('image', currentItinerary.image)
        }
        return () => {
            form.reset()
        }
    }, [form, currentItinerary])
    const handleButtonForm = async dataSubmit => {
        try {
            const formdata = new FormData()
            formdata.append('title', dataSubmit.title)
            formdata.append('description', dataSubmit.description)
            formdata.append('address', dataSubmit.address)
            formdata.append('longtitude', dataSubmit.longtitude)
            formdata.append('latitude', dataSubmit.latitude)
            formdata.append('step', dataSubmit.step)
            formdata.append(
                'destinationTravelId',
                currenDestination.id
            )
            formdata.append('image', dataSubmit.image)
            if (!data.id) {
                await dispatch(createItinerary(formdata)).then(res =>
                    unwrapResult(res)
                )
            } else {
                formdata.append('id', data.id)
                await dispatch(updateItinerary(formdata)).then(res =>
                    unwrapResult(res)
                )
            }
            toast.success(
                data
                    ? 'Create itinerary successfully'
                    : 'Update itinerary successfully',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            onClose()
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <form
            className="h-[20vh]"
            onSubmit={form.handleSubmit(handleButtonForm)}
        >
            <div className="mb-2">
                <OnePhotoUpload form={form} name={'image'} />
            </div>
            <div className="relative w-full mb-2 flex space-x-4 ">
                <div className="relative w-1/2">
                    <label className="block uppercase text-xs font-bold mb-2">
                        Title
                    </label>
                    <InputField
                        placeholder="Title"
                        type="input"
                        form={form}
                        name="title"
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="block uppercase text-xs font-bold mb-2">
                        Step
                    </label>
                    <InputField
                        placeholder="Step"
                        type="number"
                        form={form}
                        name="step"
                    />
                </div>
            </div>
            <div className="relative w-full mb-3">
                <label className="block uppercase text-sm font-bold mb-2">
                    Description
                </label>
                <TextArea
                    placeholder="Description Itinerary..."
                    form={form}
                    name="description"
                    rows={2}
                />
            </div>
            <AddressGenMap form={form} />
            <div className="mt-10 text-right pr-4">
                <Mybutton
                    // isloading={loadingItinerary > 0 ? true : false}
                    type="submit"
                    className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/5 ease-linear transition-all duration-150"
                >
                    {!_.isEmpty(data) ? 'Update' : 'Add'}
                </Mybutton>
            </div>
        </form>
    )
}
export default ItineraryForm
