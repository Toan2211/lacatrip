import React, { useEffect, useState } from 'react'
import logo from '@assets/img/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '@constants/path'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoadingAuth, signup } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
function Signup() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(selectLoadingAuth)
    const schema = yup.object().shape({
        email: yup
            .string()
            .required(t('requiredEmail'))
            .email(t('invalidEmail')),
        password: yup
            .string()
            .required(t('requiredPassword'))
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('invalidPassword')
            ),
        firstname: yup.string().required(t('requiredFirstName')),
        lastname: yup.string().required(t('requiredLastname')),
        gender: yup.string().required(t('requiredGender')),
        country: yup.string().required(t('requiredCountry')),
        confirmpassword: yup
            .string()
            .required(t('requiredConfirmPassword'))
            .oneOf([yup.ref('password'), null], t('paswordNotMatch')),
        roleId: yup.string().required(t('requiredRole'))
    })
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            gender: '',
            country: '',
            confirmpassword: '',
            roleId: '4'
        },
        resolver: yupResolver(schema)
    })
    const [dialog, setDialog] = useState(false)
    const handleSubmit = async data => {
        try {
            const res = await dispatch(signup(data))
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
        document.title = t('signup')
    }, [t])
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
                <div className="mb-5 flex items-center justify-center">
                    <img alt="logo" src={logo} className=" w-6/12" />
                </div>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('role')}
                        </label>
                        <div className="flex space-x-4 items-center">
                            <label
                                htmlFor="normalUser"
                                className="cursor-pointer"
                            >
                                <input
                                    {...form.register('roleId')}
                                    type="radio"
                                    value="4"
                                    id="normalUser"
                                />
                                {t('normalUser')}
                            </label>
                            <label
                                htmlFor="serviceManager"
                                className="cursor-pointer  items-center"
                            >
                                <input
                                    {...form.register('roleId')}
                                    type="radio"
                                    value="3"
                                    id="serviceManager"
                                />
                                {t('serviceManager')}
                            </label>
                        </div>
                        {form.formState.errors['roleId'] && (
                            <span className="text-[14px] text-red-500 pl-2 mt-1">
                                {
                                    form.formState.errors['roleId']
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
                        />
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
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            {t('country')}
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
                            {t('password')}
                        </label>
                        <InputField
                            placeholder={t('password')}
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
                            {t('confirmPassword')}
                        </label>
                        <InputField
                            placeholder={t('confirmPassword')}
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
                            {t('signup')}
                        </Mybutton>
                    </div>
                </form>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <Link
                            className="text-blueGray-200"
                            to={path.forgotPass}
                        >
                            <small>{t('forgotPassword')} ?</small>
                        </Link>
                    </div>
                    <div className="w-1/2 text-right">
                        <Link
                            className="text-blueGray-200"
                            to={path.signin}
                        >
                            <small>{t('signin')}</small>
                        </Link>
                    </div>
                </div>
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
                                successfully created. Please check
                                inbox mail and verify account. Thanks
                                you !
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

export default Signup
