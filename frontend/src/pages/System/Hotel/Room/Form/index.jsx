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
import { createRoom, currentRoomSelector, updateRoom } from '../room.slice'
import _ from 'lodash'
import { unwrapResult } from '@reduxjs/toolkit'
// eslint-disable-next-line no-useless-escape
function RoomForm({ onClose, open }) {
    const currentHotel = useSelector(currentHotelSelector)
    const currentRoom = useSelector(currentRoomSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        roomNo: yup.string().required('Room No is required'),
        title: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        price: yup
            .number()
            .typeError('Price must be number')
            .required('Price is required'),
        originalPrice: yup
            .number()
            .typeError('Original Price must be number')
            .required('Original Price is required'),
        maxPeople: yup
            .number()
            .typeError('maxPeople must be number')
            .required('maxPeople is required')
    })
    const form = useForm({
        defaultValues: {
            roomNo: '',
            title: '',
            description: '',
            price: null,
            originalPrice: null,
            maxPeople: null
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentRoom)) {
            form.setValue('roomNo', currentRoom.roomNo)
            form.setValue('title', currentRoom.title)
            form.setValue('description', currentRoom.description)
            form.setValue('price', currentRoom.price)
            form.setValue('originalPrice', currentRoom.originalPrice)
            form.setValue('maxPeople', currentRoom.maxPeople)
        }
        return () => {
            form.reset()
        }
    }, [currentRoom, form, dispatch])
    const handleSubmit = async data => {
        try {
            if (currentHotel) {
                if (_.isEmpty(currentRoom)) {
                    await dispatch(
                        createRoom({
                            ...data,
                            hotelId: currentHotel.id,
                            roomNo: data.roomNo.split(',')
                        })
                    ).then(res => unwrapResult(res))
                    toast.success('Create room successful !', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true
                    })
                }
                else
                {
                    await dispatch(
                        updateRoom({
                            ...data,
                            hotelId: currentHotel.id,
                            id: currentRoom.id
                        })
                    ).then(res => unwrapResult(res))
                    toast.success('Update room successful !', {
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
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Room No
                        </label>
                        <InputField
                            placeholder="Please split room no by comma(,)"
                            type="input"
                            form={form}
                            name="roomNo"
                            onKeyDown={handleOnKeyDown}
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Title
                        </label>
                        <InputField
                            placeholder="Title"
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
                            Description
                        </label>
                        <TextArea
                            placeholder="Description Hotel..."
                            form={form}
                            name="description"
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Price
                            </label>
                            <InputField
                                placeholder="Price"
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
                                Original Price
                            </label>
                            <InputField
                                placeholder="Price"
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
                            Max People
                        </label>
                        <InputField
                            placeholder="Max people"
                            type="number"
                            form={form}
                            name="maxPeople"
                        />
                    </div>
                    <div className="mt-6 text-right">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            {_.isEmpty(currentRoom) ? 'Add' : 'Edit'}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default RoomForm
