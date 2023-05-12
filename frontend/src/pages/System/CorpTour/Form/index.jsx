import Drawer from '@components/Drawer'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import _ from 'lodash'
import { unwrapResult } from '@reduxjs/toolkit'
import { createCorpTour, currentCorpTourSelector, updateCorpTour } from '../corptour.slice'
// eslint-disable-next-line no-useless-escape
function CorpTourForm({ onClose, open }) {
    const currentCorpTour = useSelector(currentCorpTourSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        phone: yup.string().required('Phone is required'),
        website: yup.string().required('Website is required'),
        address: yup.string().required('Address is required')
    })
    const form = useForm({
        defaultValues: {
            name: '',
            phone: '',
            website: '',
            address: ''
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentCorpTour)) {
            form.setValue('name', currentCorpTour.name)
            form.setValue('phone', currentCorpTour.phone)
            form.setValue('website', currentCorpTour.website)
            form.setValue('address', currentCorpTour.address)
        }
        return () => {
            form.reset()
        }
    }, [currentCorpTour, form, dispatch])
    const handleSubmit = async data => {
        try {
            if (currentCorpTour) {
                if (_.isEmpty(currentCorpTour)) {
                    await dispatch(
                        createCorpTour({
                            ...data
                        })
                    ).then(res => unwrapResult(res))
                    toast.success('Create company tour successful !', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true
                    })
                }
                else
                {
                    await dispatch(
                        updateCorpTour({
                            ...data,
                            id: currentCorpTour.id
                        })
                    ).then(res => unwrapResult(res))
                    toast.success('Update company tour successful !', {
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
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                {_.isEmpty(currentCorpTour) ? 'Add Company Tour' : 'Edit Company Tour'}
            </header>
            <div className="p-5">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="relative w-full">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Name
                        </label>
                        <InputField
                            placeholder="Name of company tour"
                            type="input"
                            form={form}
                            name="name"
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Phone
                        </label>
                        <InputField
                            placeholder="Phone number to contact"
                            form={form}
                            name="phone"
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Website
                        </label>
                        <InputField
                            placeholder="Website"
                            form={form}
                            name="website"
                            rows={2}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-sm font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Address
                        </label>
                        <InputField
                            placeholder="Address of company tour"
                            form={form}
                            name="address"
                            rows={2}
                        />
                    </div>
                    <div className="mt-6 text-right">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            {_.isEmpty(currentCorpTour) ? 'Add' : 'Edit'}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default CorpTourForm
