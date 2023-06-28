import { phoneRegExp } from '@constants/regex'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectUser } from '@pages/Auth/auth.slice'
import InputField from '@components/InputField'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import AvatarUpload from '@components/AvatarUpload'
import { selectLoadingAuth } from '@pages/Auth/auth.slice'
import Mybutton from '@components/MyButton'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { updateUser } from '@pages/Auth/auth.slice'
function CardProfile() {
    const loading = useSelector(selectLoadingAuth)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Hãy nhập email')
            .email('Email không hợp lệ'),
        firstname: yup.string().required('Hãy nhập họ'),
        lastname: yup.string().required('Hãy nhập tên'),
        gender: yup.string().required('Hãy chọn giới tính'),
        phone: yup
            .string()
            .required('Hãy nhập số điện thoại')
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    })
    const form = useForm({
        defaultValues: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender ? '1' : '0',
            avatar: user.avatar,
            phone: user.phone
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async data => {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('firstname', data.firstname)
        formData.append('lastname', data.lastname)
        formData.append('gender', +data.gender)
        formData.append('phone', data.phone)
        if (data.avatar && typeof data.avatar !== 'string')
            formData.append('avatar', data.avatar)
        formData.append('id', user.id)
        try {
            const res = await dispatch(updateUser(formData))
            unwrapResult(res)
            toast.success('Cập nhật thông tin thành công', {
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
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="rounded-t bg-white mb-7 px-6 py-6">
                    <div className="text-center flex justify-between ">
                        <h6 className="text-xl font-bold">
                            Tài khoản của tôi
                        </h6>
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/8 ease-linear transition-all duration-150"
                            type="submit"
                            isloading={+loading}
                        >
                            Cập nhật
                        </Mybutton>
                    </div>
                </div>
                <div className="flex px-4 lg:px-10 py-10 pt-0">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Thông tin người dùng
                    </h6>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Số điện thoại
                                </label>
                                <InputField
                                    placeholder="Số điện thoại"
                                    type="input"
                                    form={form}
                                    name="phone"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600  text-xs font-bold mb-2"
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
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600  text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Họ
                                </label>
                                <InputField
                                    placeholder="Họ"
                                    type="input"
                                    form={form}
                                    name="firstname"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600  text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Tên
                                </label>
                                <InputField
                                    placeholder="Tên"
                                    type="input"
                                    form={form}
                                    name="lastname"
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label
                                    className="block uppercase text-gray-600  text-xs font-bold mb-2"
                                    htmlFor="grid-password"
                                >
                                    Giới tính
                                </label>
                                <div className="flex space-x-4">
                                    <label
                                        htmlFor="male"
                                        className="cursor-pointer"
                                    >
                                        <input
                                            {...form.register(
                                                'gender'
                                            )}
                                            type="radio"
                                            value="1"
                                            id="male"
                                        />
                                        Nam
                                    </label>
                                    <label
                                        htmlFor="female"
                                        className="cursor-pointer"
                                    >
                                        <input
                                            {...form.register(
                                                'gender'
                                            )}
                                            type="radio"
                                            value="0"
                                            id="female"
                                        />
                                       Nữ
                                    </label>
                                </div>
                                {form.formState.errors['gender'] && (
                                    <span className="text-[14px] text-red-500 pl-2 mt-1">
                                        {
                                            form.formState.errors[
                                                'gender'
                                            ].message
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-1/4">
                        <AvatarUpload form={form} name={'avatar'} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CardProfile
