import { yupResolver } from '@hookform/resolvers/yup'
import { unwrapResult } from '@reduxjs/toolkit'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import { changePassword, loadingChangePassSelector, logout, selectUser } from '@pages/Auth/auth.slice'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
function ChangePassword() {
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
        <div className="ml-[16%] w-[50%] pt-5">
            <header className="font-bold text-2xl mb-3 mt-5">
                Change Password
            </header>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                <div className="mt-6 text-left">
                    <Mybutton
                        className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/6 ease-linear transition-all duration-150"
                        type="submit"
                        isloading={+loading}
                    >
                        Change
                    </Mybutton>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
