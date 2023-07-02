import React, { useEffect, useState } from 'react'
import logo from '@assets/img/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '@constants/path'
import Mybutton from '@components/MyButton'
import InputField from '@components/InputField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, selectLoadingAuth } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
function ForgotPassword() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const loading = useSelector(selectLoadingAuth)
    const navigate = useNavigate()
    const [dialog, setDialog] = useState(false)
    const schema = yup.object().shape({
        email: yup
            .string()
            .required(t('requiredEmail'))
            .email(t('invalidEmail'))
    })
    const form = useForm({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const res = await dispatch(forgotPassword(data))
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
        document.title = t('forgotPassword')
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
                    <div className="text-center mt-6">
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            {t('getPassword')}
                        </Mybutton>
                    </div>
                </form>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <Link
                            className="text-blueGray-200"
                            to={path.signin}
                        >
                            <small>{t('signin')}</small>
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
            {dialog && (
                <div className="fixed left-0 top-0 h-screen w-screen bg-white flex items-center justify-center">
                    <div className="relative flex flex-col min-w-0 break-words w-full lg:w-1/3 md:w-1/2 mb-6 shadow-lg rounded-lg bg-slate-50 border-0 p-4 mx-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold mb-4">
                                Reset Password Successfully
                            </h1>
                            <h2>
                                Please check inbox mail and signin to
                                Application. Thanks you !
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

export default ForgotPassword
