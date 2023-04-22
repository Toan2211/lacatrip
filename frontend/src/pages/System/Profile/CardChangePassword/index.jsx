import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Mybutton from '@components/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import { toast } from 'react-toastify'
import { changePassword } from '@pages/Auth/auth.slice'
import { logout } from '@pages/Auth/auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { loadingChangePassSelector } from '@pages/Auth/auth.slice'
function CardChangePassword() {
    const user = useSelector(selectUser)
    const loading = useSelector(loadingChangePassSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        oldPassword: yup
            .string()
            .required('Password is required')
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
            ),
        newPassword: yup
            .string()
            .required('Password is required')
            .matches(
                // eslint-disable-next-line
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
            ),
        confirmNewPassword: yup
            .string()
            .required('ConfirmPassword is required')
            .oneOf(
                [yup.ref('newPassword'), null],
                'Passwords must match'
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
            toast.success('Change password successful', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
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
        <div className="relative flex flex-col min-w-0 break-words w-3/4 mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between ">
                        <h6 className="text-xl font-bold">
                            Change Password
                        </h6>
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/8 ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            Change
                        </Mybutton>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="flex flex-col mt-5">
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Old Password
                                </label>
                                <InputField
                                    placeholder="Old Password"
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
                                    New Password
                                </label>
                                <InputField
                                    placeholder="New Password"
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
                                    Confirm New Password
                                </label>
                                <InputField
                                    placeholder="Confirm New Password"
                                    type="password"
                                    form={form}
                                    name="confirmNewPassword"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
            </form>
        </div>
    )
}

export default CardChangePassword
