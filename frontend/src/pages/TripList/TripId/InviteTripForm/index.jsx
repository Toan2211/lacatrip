import { yupResolver } from '@hookform/resolvers/yup'
import { Modal } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'
import * as yup from 'yup'
function InviteTripForm({ showModal, onClose, tripId }) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email')
    })
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmitInvite = value => {
        const sendData = {
            email: value.email,
            tripId: tripId
        }
        onClose()
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
                    Invite Trip
                </div>
                <div className="flex justify-center mb-2">
                    <div className="w-50% bg-slate-200 p-1 rounded-lg flex gap-1">
                        <button
                            type="button"
                            className="p-1 bg-white rounded-md"
                        >
                            Can edit
                        </button>
                        <button type="button">View only</button>
                    </div>
                </div>
                <div className="flex p-2 items-center border-[1px] border-blue-500 rounded-md">
                    <AiOutlineMail />
                    <input
                        {...register('email')}
                        className="ml-2 py-2 text-lg focus:outline-none w-full"
                        placeholder="Invite tripmate by email"
                    />
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-1/4 active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                        Invite
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default InviteTripForm
