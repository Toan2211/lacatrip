import { selectLoadingAuth, selectUser } from '@pages/Auth/auth.slice'
import { phoneRegExp } from '@constants/regex'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import Mybutton from '@components/MyButton'
import AvatarUpload from '@components/AvatarUpload'
import { toast } from 'react-toastify'
import { updateUser } from '@pages/Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'

function Profile() {
    const loading = useSelector(selectLoadingAuth)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
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
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender ? '1' : '0',
            country: user.country,
            avatar: user.avatar,
            phone: user.phone
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const formData = new FormData()
            formData.append('email', data.email)
            formData.append('firstname', data.firstname)
            formData.append('lastname', data.lastname)
            formData.append('gender', +data.gender)
            formData.append('country', data.country)
            formData.append('phone', data.phone)
            if (data.avatar && typeof data.avatar !== 'string')
                formData.append('avatar', data.avatar)
            formData.append('id', user.id)
            try {
                const res = await dispatch(updateUser(formData))
                unwrapResult(res)
                toast.success('Update user successful', {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                })
            } catch (error) {
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 1000,
                    hideProgressBar: true
                })
            }
        }
        catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <div className="ml-[16%] w-[50%] pt-5">
            <header className="font-bold text-2xl mb-3 mt-5">
                Account Information
            </header>
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
                            {form.formState.errors['gender'].message}
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
                        disabled
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
                        Edit
                    </Mybutton>
                </div>
            </form>
        </div>
    )
}

export default Profile
