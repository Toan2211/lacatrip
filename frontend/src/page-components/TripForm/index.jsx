import InputField from '@components/InputField'
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal } from 'flowbite-react'
import { createTrip } from '@pages/TripList/trip.slice'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'
function TripForm({ showModal, onClose }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        name: yup
            .string()
            .required(t('validateCreate'))
    })
    const form = useForm({
        defaultValues: {
            name: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const res = await dispatch(createTrip(data))
            unwrapResult(res)
            toast.success(t('createTripSuccessful'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
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
        <Modal show={showModal} onClose={onClose} size="md">
            <Modal.Header className=" bg-slate-100">{t('createTrip')}</Modal.Header>
            <Modal.Body>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('tripName')}
                        </label>
                        <InputField
                            placeholder={t('tripName')}
                            type="input"
                            form={form}
                            name="name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 flex items-center ml-auto"
                    >
                        {t('create')}
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default TripForm
