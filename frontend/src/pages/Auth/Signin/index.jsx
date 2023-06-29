import React, { useEffect } from 'react'
import logo from '@assets/img/logo.svg'
import { Link } from 'react-router-dom'
import { path } from '@constants/path'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoadingAuth, signin } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

function Signin() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
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
            )
    })
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const res = await dispatch(signin(data))
            unwrapResult(res)
            toast.success(t('signinSuccess'), {
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
    useEffect(() => {
        document.title = t('signin')
    }, [t])
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
                    <div className="text-center mt-6">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            {t('signin')}
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
                            to={path.signup}
                        >
                            <small>{t('createNewAccount')}</small>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
