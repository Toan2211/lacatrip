import React, { useEffect, useState } from 'react'
import logo from '@assets/img/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { path } from '@constants/path'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import { useDispatch, useSelector } from 'react-redux'
import { createAccountInvite, selectLoadingAuth } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import queryString from 'query-string'
function AccountInvite() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(selectLoadingAuth)
    const location = useLocation()
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        password: yup
            .string()
            .required('Password is required')
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
            ),
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required'),
        gender: yup.string().required('Gender is required'),
        country: yup.string().required('Country is required'),
        confirmpassword: yup
            .string()
            .required('ConfirmPassword is required')
            .oneOf(
                [yup.ref('password'), null],
                'Passwords must match'
            )
    })
    const form = useForm({
        defaultValues: {
            email: queryString.parse(location.search).email.replace(/\s/g, '+'),
            password: '',
            firstname: '',
            lastname: '',
            gender: '',
            country: '',
            confirmpassword: ''
        },
        resolver: yupResolver(schema)
    })
    const [dialog, setDialog] = useState(false)
    const handleSubmit = async data => {
        try {
            const res = await dispatch(createAccountInvite(data))
            unwrapResult(res)
            setDialog(true)
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    useEffect(() => {
        document.title = 'Create account invite'
    }, [])
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
                <div className="mb-5 flex items-center justify-center">
                    <img alt="logo" src={logo} className=" w-6/12" />
                </div>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                            disabled={true}
                        />
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
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Password
                        </label>
                        <InputField
                            placeholder="Password"
                            type="password"
                            form={form}
                            name="password"
                        />
                    </div>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Confirm Password
                        </label>
                        <InputField
                            placeholder="Confirm Password"
                            type="password"
                            form={form}
                            name="confirmpassword"
                        />
                    </div>
                    <div className="text-center mt-6">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            Signup
                        </Mybutton>
                    </div>
                </form>
            </div>
            {dialog && (
                <div className="fixed left-0 top-0 h-screen w-screen bg-white flex items-center justify-center">
                    <div className="relative flex flex-col min-w-0 break-words w-full lg:w-1/3 md:w-1/2 mb-6 shadow-lg rounded-lg bg-slate-50 border-0 p-4 mx-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">
                                Signup Successfully
                            </h1>
                            <h2>
                                Congratulations, your account has been
                                successfully created. Enjoy your trip
                                with your friend. Thanks you !
                            </h2>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/4 ease-linear transition-all duration-150"
                                onClick={() => navigate(path.signin)}
                            >
                                start now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountInvite
