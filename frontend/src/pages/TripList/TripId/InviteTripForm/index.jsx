import { yupResolver } from '@hookform/resolvers/yup'
import { Modal } from 'flowbite-react'
import { inviteMember } from '@pages/TripList/trip.slice'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'
function InviteTripForm({ showModal, onClose, tripId }) {
    const { t } = useTranslation()
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: yup
            .string()
            .required(t('requiredEmail'))
            .email(t('invalidEmail'))
    })
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmitInvite = async value => {
        try {
            const sendData = {
                email: value.email,
                tripId: tripId,
                editable: editable
            }
            await dispatch(inviteMember(sendData)).then(res =>
                unwrapResult(res)
            )
            onClose()
            toast.success(t('inviteTripMateSuccess'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(error.message ? error.message : 'Error', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <Modal
            dismissible={true}
            show={showModal}
            onClose={onClose}
            size="md"
            popup={true}
        >
            <form
                className="p-4"
                onSubmit={handleSubmit(handleSubmitInvite)}
            >
                <div className="font-bold text-lg text-center mb-4">
                    {t('inviteTrip')}
                </div>
                <div className="flex justify-center mb-2">
                    <div className="w-50% bg-slate-200 p-1 rounded-lg flex gap-1">
                        <button
                            type="button"
                            className={`${
                                editable
                                    ? 'p-1 bg-white rounded-md'
                                    : ''
                            }`}
                            onClick={() => setEditable(!editable)}
                        >
                            {t('canEdit')}
                        </button>
                        <button
                            type="button"
                            className={`${
                                !editable
                                    ? 'p-1 bg-white rounded-md'
                                    : ''
                            }`}
                            onClick={() => setEditable(!editable)}
                        >
                            {t('viewOnly')}
                        </button>
                    </div>
                </div>
                <div className="flex p-2 items-center border-[1px] border-blue-500 rounded-md">
                    <AiOutlineMail />
                    <input
                        {...register('email')}
                        className="ml-2 py-2 text-lg focus:outline-none w-full"
                        placeholder={t('inviteTripMateByEmail')}
                    />
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-1/4 active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                        {t('invite')}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default InviteTripForm
