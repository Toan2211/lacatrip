import { yupResolver } from '@hookform/resolvers/yup'
import Drawer from '@components/Drawer'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import React, { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import AvatarUpload from '@components/AvatarUpload'
import { phoneRegExp } from '@constants/regex'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
import {
    createServiceManager,
    currentServiceManagerSelector,
    getServiceManagers,
    loadingServiceManager,
    updateServiceManager
} from '../servicemanager.slice'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useTranslation } from 'react-i18next'
function ServiceManagerForm({ onClose, open }) {
    const { t } = useTranslation()
    const loading = useSelector(loadingServiceManager)
    const currentServiceManager = useSelector(
        currentServiceManagerSelector
    )
    const dispatch = useDispatch()
    const emptyRef = useRef({})
    const schema = yup.object().shape({
        email: yup
            .string()
            .required(t('requiredEmail'))
            .email(t('invalidEmail')),
        firstname: yup.string().required(t('requiredFirstName')),
        lastname: yup.string().required(t('requiredLastname')),
        gender: yup.string().required(t('requiredGender')),
        country: yup.string().required(t('requiredCountry')),
        phone: yup
            .string()
            .required(t('requiredPhone'))
            .matches(phoneRegExp, t('invalidPhone'))
    })
    const form = useForm({
        defaultValues: {
            email: '',
            firstname: '',
            lastname: '',
            gender: '',
            country: '',
            avatar: '',
            phone: ''
        },
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        if (!_.isEmpty(currentServiceManager)) {
            form.setValue('email', currentServiceManager.user.email)
            form.setValue(
                'firstname',
                currentServiceManager.user.firstname
            )
            form.setValue(
                'lastname',
                currentServiceManager.user.lastname
            )
            form.setValue(
                'gender',
                currentServiceManager.user.gender ? '1' : '0'
            )
            form.setValue(
                'country',
                currentServiceManager.user.country
            )
            form.setValue(
                'avatar',
                currentServiceManager.user.avatar
                    ? currentServiceManager.user.avatar
                    : undefined
            )
            form.setValue('phone', currentServiceManager.user.phone)
        }
        return () => {
            form.reset()
        }
    }, [currentServiceManager, form, dispatch])
    useEffect(() => {
        emptyRef.current = {}
    }, [emptyRef])
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || ''
        }
    }, [location.search])
    const handleSubmit = async data => {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('firstname', data.firstname)
        formData.append('lastname', data.lastname)
        formData.append('gender', data.gender)
        formData.append('country', data.country)
        formData.append('phone', data.phone)
        if (data.avatar && typeof data.avatar !== 'string')
            formData.append('avatar', data.avatar)
        try {
            let res
            if (_.isEmpty(currentServiceManager.user))
                res = await dispatch(createServiceManager(formData))
            else {
                formData.append('id', currentServiceManager.id)
                res = await dispatch(updateServiceManager(formData))
            }
            unwrapResult(res)
            toast.success(
                _.isEmpty(currentServiceManager)
                    ? t('createServiceManagerSuccessful')
                    : 'Update service manager successfully',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            dispatch(getServiceManagers(queryParams))
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
            </header>
            <div className="p-5">
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="relative w-full mb-8">
                        <AvatarUpload form={form} name={'avatar'} />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('firstName')}
                            </label>
                            <InputField
                                placeholder={t('firstName')}
                                type="input"
                                form={form}
                                name="firstname"
                            />
                        </div>
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('lastName')}
                            </label>
                            <InputField
                                placeholder={t('lastName')}
                                type="input"
                                form={form}
                                name="lastname"
                            />
                        </div>
                    </div>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('gender')}
                        </label>
                        <div className="flex space-x-4">
                            <label
                                htmlFor="male"
                                className="cursor-pointer"
                            >
                                <input
                                    {...form.register('gender')}
                                    type="radio"
                                    value="1"
                                    id="male"
                                />
                                {t('male')}
                            </label>
                            <label
                                htmlFor="female"
                                className="cursor-pointer"
                            >
                                <input
                                    {...form.register('gender')}
                                    type="radio"
                                    value="0"
                                    id="female"
                                />
                                {t('female')}
                            </label>
                        </div>
                        {form.formState.errors['gender'] && (
                            <span className="text-[14px] text-red-500 pl-2 mt-1">
                                {
                                    form.formState.errors['gender']
                                        .message
                                }
                            </span>
                        )}
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Email
                        </label>
                        <InputField
                            placeholder="Email"
                            type="email"
                            form={form}
                            name="email"
                            disabled={
                                _.isEmpty(currentServiceManager)
                                    ? false
                                    : true
                            }
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('phone')}
                        </label>
                        <InputField
                            placeholder={t('phone')}
                            type="input"
                            form={form}
                            name="phone"
                        />
                    </div>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('country')}
                        </label>
                        <MySelect
                            placeholder={t('country')}
                            form={form}
                            name="country"
                            options={countrys.map(country =>
                                Object({
                                    value: country,
                                    label: country
                                })
                            )}
                        />
                    </div>
                    {_.isEmpty(currentServiceManager) && (
                        <div className="mt-6 text-right">
                            <Mybutton
                                className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                                type="submit"
                                isloading={+loading}
                            >
                                {t('create')}
                            </Mybutton>
                        </div>
                    )}
                </form>
            </div>
        </Drawer>
    )
}

export default ServiceManagerForm
