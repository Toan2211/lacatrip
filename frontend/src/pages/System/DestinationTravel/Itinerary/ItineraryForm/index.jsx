import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
    createItinerary,
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
import {
    currentDestinationSelector,
    getDetail
} from '../../destination.slice'
import { useTranslation } from 'react-i18next'
import { selectUser } from '@pages/Auth/auth.slice'
function ItineraryForm({
    data,
    onClose,
    sheet,
    handleGetAllDestinations
}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const currenDestination = useSelector(currentDestinationSelector)
    const profile = useSelector(selectUser)
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            descriptionVN: '',
            address: '',
            longtitude: '',
            latitude: '',
            step: currenDestination?.itineraries?.length
                ? currenDestination?.itineraries?.length + 1
                : 1,
            image: ''
        }
    })
    useEffect(() => {
        if (!_.isEmpty(data)) {
            form.setValue('title', data.title)
            form.setValue('description', data.description)
            form.setValue('descriptionVN', data.descriptionVN)
            form.setValue('address', data.address)
            form.setValue('longtitude', data.longtitude)
            form.setValue('latitude', data.latitude)
            form.setValue('step', data.step)
            form.setValue('image', data.image)
        }
        return () => {
            form.reset()
        }
    }, [form, data, sheet])
    const handleButtonForm = async dataSubmit => {
        try {
            const formdata = new FormData()
            formdata.append('title', dataSubmit.title)
            formdata.append('description', dataSubmit.description)
            formdata.append('descriptionVN', dataSubmit.descriptionVN)
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
                data.id
                    ? `${t('update')} ${t('itinerary').toLowerCase()} ${t(
                        'successfully'
                    ).toLowerCase()}`
                    : `${t('create')} ${t('itinerary').toLowerCase()} ${t(
                        'successfully'
                    ).toLowerCase()}`,
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            onClose()
            dispatch(getDetail(currenDestination.id))
            handleGetAllDestinations()
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
                        {t('name')}
                    </label>
                    <InputField
                        placeholder={t('name')}
                        type="input"
                        form={form}
                        name="title"
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="block uppercase text-xs font-bold mb-2">
                        {t('step')}
                    </label>
                    <InputField
                        placeholder={t('step')}
                        type="number"
                        form={form}
                        name="step"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="relative w-full mb-3">
                <label className="block uppercase text-sm font-bold mb-2">
                    {t('description') + ' '+ t('languageEn')}
                </label>
                <TextArea
                    placeholder={t('description') + ' ' + t('itinerary').toLowerCase()+ ' '+ t('languageEn').toLowerCase()}
                    form={form}
                    name="description"
                    rows={2}
                />
            </div>
            <div className="relative w-full mb-3">
                <label className="block uppercase text-sm font-bold mb-2">
                    {t('description') + ' '+ t('languageVN')}
                </label>
                <TextArea
                    placeholder={t('description') + ' ' + t('itinerary').toLowerCase()+ ' '+ t('languageVN').toLowerCase()}
                    form={form}
                    name="descriptionVN"
                    rows={2}
                />
            </div>
            <AddressGenMap form={form} />
            {
                profile.serviceManagerId &&             <div className="mt-10 text-right pr-4">
                    <Mybutton
                        // isloading={loadingItinerary > 0 ? true : false}
                        type="submit"
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                    >
                        {!_.isEmpty(data) ? t('update') : t('add')}
                    </Mybutton>
                </div>
            }
        </form>
    )
}
export default ItineraryForm
