import { yupResolver } from '@hookform/resolvers/yup'
import Drawer from '@components/Drawer'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import {
    createEmployee,
    currentEmployeeSelector,
    getEmployees,
    loadingEmployees,
    updateEmployee
} from '../employee.slice'
import AvatarUpload from '@components/AvatarUpload'
import { phoneRegExp } from '@constants/regex'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import _ from 'lodash'
function EmployeeForm({ onClose, open }) {
    const loading = useSelector(loadingEmployees)
    const currentEmployee = useSelector(currentEmployeeSelector)
    const dispatch = useDispatch()
    const emptyRef = useRef({})
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required'),
        gender: yup.string().required('Gender is required'),
        country: yup.string().required('Country is required'),
        phone: yup
            .string()
            .required('Phone number is required')
            .matches(phoneRegExp, 'Phone number is not valid')
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
        if (!_.isEmpty(currentEmployee)) {
            form.setValue('email', currentEmployee.email)
            form.setValue('firstname', currentEmployee.firstname)
            form.setValue('lastname', currentEmployee.lastname)
            form.setValue(
                'gender',
                currentEmployee.gender ? '1' : '0'
            )
            form.setValue('country', currentEmployee.country)
            form.setValue(
                'avatar',
                currentEmployee.avatar ? currentEmployee.avatar : undefined
            )
            form.setValue('phone', currentEmployee.phone)
        }
        return () => {
            form.reset()
        }
    }, [currentEmployee, form, dispatch])
    useEffect(() => {
        emptyRef.current = {}
    }, [emptyRef])
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
            if (_.isEmpty(currentEmployee))
                res = await dispatch(createEmployee(formData))
            else {
                formData.append('id', currentEmployee.id)
                res = await dispatch(updateEmployee(formData))
            }
            unwrapResult(res)
            toast.success(
                _.isEmpty(currentEmployee)
                    ? 'Create employee successfully'
                    : 'Update employee successfully',
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                }
            )
            dispatch(getEmployees())
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
                Add Employee
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
                                Firstname
                            </label>
                            <InputField
                                placeholder="Firstname"
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
                                Lastname
                            </label>
                            <InputField
                                placeholder="Lastname"
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
                            Gender
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
                                Male
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
                                Female
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
                            disabled = {_.isEmpty(currentEmployee) ? false : true}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            PhoneNumber
                        </label>
                        <InputField
                            placeholder="Phone Number"
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
                            Country
                        </label>
                        <MySelect
                            placeholder="Country"
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
                    <div className="mt-6 text-right">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            {_.isEmpty(currentEmployee)
                                ? 'Create'
                                : 'Update'}
                        </Mybutton>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}

export default EmployeeForm
