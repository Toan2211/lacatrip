import { yupResolver } from '@hookform/resolvers/yup'
import { unwrapResult } from '@reduxjs/toolkit'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import {
    changePassword,
    loadingChangePassSelector,
    logout,
    selectUser
} from '@pages/Auth/auth.slice'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { path } from '@constants/path'
function ChangePassword() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const loading = useSelector(loadingChangePassSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        oldPassword: yup
            .string()
            .required(t('requiredPassword'))
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('invalidPassword')
            ),
        newPassword: yup
            .string()
            .required(t('requiredPassword'))
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('invalidPassword')
            ),
        confirmNewPassword: yup
            .string()
            .required(t('requiredConfirmPassword'))
            .oneOf(
                [yup.ref('newPassword'), null],
                t('paswordNotMatch')
            )
    })
    const form = useForm({
        defaultValues: {
            id: user.id,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const res = await dispatch(changePassword(data))
            unwrapResult(res)
            toast.success(t('changePasswordSuccessful'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
            navigate(path.signin)
            dispatch(logout())
        } catch (error) {
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
                {t('changePassword')}
            </header>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col mt-5">
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('oldPassword')}
                            </label>
                            <InputField
                                placeholder={t('oldPassword')}
                                type="password"
                                form={form}
                                name="oldPassword"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-600  text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('newPassword')}
                            </label>
                            <InputField
                                placeholder={t('newPassword')}
                                type="password"
                                form={form}
                                name="newPassword"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-gray-600  text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                {t('confirmPassword')}
                            </label>
                            <InputField
                                placeholder={t('confirmPassword')}
                                type="password"
                                form={form}
                                name="confirmNewPassword"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-left">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/6 ease-linear transition-all duration-150"
                        type="submit"
                        isloading={+loading}
                    >
                        {t('change')}
                    </Mybutton>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
