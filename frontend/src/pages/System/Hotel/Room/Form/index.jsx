import Drawer from '@components/Drawer'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import TextArea from '@components/TextArea'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { currentHotelSelector } from '../../hotel.slice'
import {
    createRoom,
    currentRoomSelector,
    updateRoom
} from '../room.slice'
import _ from 'lodash'
import { unwrapResult } from '@reduxjs/toolkit'
import OnePhotoUpload from '@components/OnePhotoUpload'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line no-useless-escape
function RoomForm({ onClose, open }) {
    const { t, i18n } = useTranslation()
    const currentHotel = useSelector(currentHotelSelector)
    const currentRoom = useSelector(currentRoomSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        // roomNo: yup.string().required('Room No is required'),
        title: yup.string().required(t('requiredName')),
        description: yup
            .string()
            .required(
                t('requiredDescription') +
                    ' ' +
                    t('room').toLocaleLowerCase()
            ),
        price: yup
            .number()
            .typeError(t('invalidPrice'))
            .required(t('requiredPrice')),
        originalPrice: yup
            .number()
            .typeError(t('invalidOriginalPrice'))
            .required(t('requiredOriginalPrice')),
        adultCount: yup
            .number()
            .typeError(t('invalid'))
            .required(t('required'))
    })
    const form = useForm({
        defaultValues: {
            roomNo: '',
            title: '',
            description: '',
            price: '',
            originalPrice: '',
            childrenCount: '',
            bedCount: '',
            adultCount: '',
            area: '',
            image: ''
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentRoom)) {
            // form.setValue('roomNo', currentRoom.roomNo)
            form.setValue('title', currentRoom.title)
            form.setValue('description', currentRoom.description)
            form.setValue('descriptionVN', currentRoom.descriptionVN)
            form.setValue('price', i18n.language === 'vn' ? currentRoom.price*23000 : currentRoom.price)
            form.setValue('originalPrice', i18n.language === 'vn' ? currentRoom.originalPrice*23000 : currentRoom.originalPrice)
            form.setValue('childrenCount', currentRoom.childrenCount)
            form.setValue('adultCount', currentRoom.adultCount)
            form.setValue('bedCount', currentRoom.bedCount)
            form.setValue('area', currentRoom.area)
            form.setValue('image', currentRoom.image)
        }
        return () => {
            form.setValue('roomNo', '')
            form.setValue('title', '')
            form.setValue('description', '')
            form.setValue('descriptionVN', '')
            form.setValue('price', '')
            form.setValue('originalPrice', '')
            form.setValue('childrenCount', '')
            form.setValue('adultCount', '')
            form.setValue('bedCount', '')
            form.setValue('area', '')
            // form.setValue('image', '')
        }
    }, [currentRoom, form, dispatch, i18n.language])
    const handleSubmit = async data => {
        try {
            if (currentHotel) {
                const formData = new FormData()
                formData.append('title', data.title)
                formData.append('description', data.description)
                formData.append('descriptionVN', data.descriptionVN)
                formData.append('price', i18n.language === 'vn' ? data.price/23000 : data.price)
                formData.append('originalPrice', i18n.language === 'vn' ? data.originalPrice/23000 : data.originalPrice)
                formData.append('hotelId', currentHotel.id)
                formData.append('childrenCount', data.childrenCount)
                formData.append('adultCount', data.adultCount)
                formData.append('bedCount', data.bedCount)
                formData.append('area', data.area)
                if (typeof data.image !== 'string')
                    formData.append('image', data.image)
                if (_.isEmpty(currentRoom)) {
                    if (!data.roomNo) return
                    if (!data.roomNo.includes(','))
                        formData.append('roomNo', data.roomNo)
                    else
                        data.roomNo.split(',').forEach(roomNo => {
                            formData.append('roomNo', roomNo)
                        })
                    await dispatch(createRoom(formData)).then(res =>
                        unwrapResult(res)
                    )
                    toast.success(`${t('create')} ${t('room')}  ${t('successfully')}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true
                    })
                } else {
                    formData.append('id', currentRoom.id)
                    await dispatch(updateRoom(formData)).then(res =>
                        unwrapResult(res)
                    )
                    toast.success(`${t('update')} ${t('room')}  ${t('successfully')}`, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true
                    })
                }
            }
            onClose()
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const handleOnKeyDown = e => {
        if (
            !(
                e.keyCode === 188 ||
                e.keyCode === 8 ||
                (e.keyCode >= 48 && e.keyCode <= 57)
            )
        )
            e.preventDefault()
    }
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                {_.isEmpty(currentRoom) ? 'Add Room' : 'Edit Room'}
            </header>
            <div className="p-5">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="mb-2">
                        <OnePhotoUpload form={form} name={'image'} />
                    </div>
                    {_.isEmpty(currentRoom) && (
                        <div className="relative w-full">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Room No
                            </label>
                            <InputField
                                placeholder={t('roomNoPlaceHolder')}
                                type="input"
                                form={form}
                                name="roomNo"
                                onKeyDown={handleOnKeyDown}
                            />
                        </div>
                    )}

                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('name')}
                        </label>
                        <InputField
                            placeholder={t('name')}
                            type="input"
                            form={form}
                            name="title"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('description')} ${t('languageEn')}`}
                        </label>
                        <TextArea
                            placeholder={`${t('description').toUpperCase()} ${t('languageEn')}`}
                            form={form}
                            name="description"
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('description').toUpperCase()} ${t('languageVN')}`}
                        </label>
                        <TextArea
                            placeholder={`${t('description')} ${t('languageVN')}`}
                            form={form}
                            name="descriptionVN"
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('price')} ({t('money')})
                            </label>
                            <InputField
                                placeholder={t('price')}
                                type="number"
                                form={form}
                                name="price"
                            />
                        </div>
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('originalPrice')} ({t('money')})
                            </label>
                            <InputField
                                placeholder={t('originalPrice')}
                                type="number"
                                form={form}
                                name="originalPrice"
                            />
                        </div>
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('adult')} ${t('limit')}`}
                        </label>
                        <InputField
                            placeholder={`${t('adult')} ${t('limit')}`}
                            type="number"
                            form={form}
                            name="adultCount"
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('children')} ${t('limit')}`}
                        </label>
                        <InputField
                            placeholder={`${t('children')} ${t('limit')}`}
                            type="number"
                            form={form}
                            name="childrenCount"
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('bed')} ${t('limit')}`}
                        </label>
                        <InputField
                            placeholder={`${t('bed')} ${t('limit')}`}
                            type="number"
                            form={form}
                            name="bedCount"
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {`${t('area')}`}
                        </label>
                        <InputField
                            placeholder={`${t('area')}`}
                            type="number"
                            form={form}
                            name="area"
                        />
                    </div>
                    <div className="mt-6 text-right">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            {_.isEmpty(currentRoom) ? t('create') : t('update') }
                        </Mybutton>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default RoomForm
