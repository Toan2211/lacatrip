import Drawer from '@components/Drawer'
import AvatarUpload from '@components/AvatarUpload'
import React, { useEffect } from 'react'
import InputField from '@components/InputField'
import { useSelector } from 'react-redux'
import { currentClientSelector } from '../client.slice'
import { useForm } from 'react-hook-form'
import _ from 'lodash'

function ClientForm({ onClose, open }) {
    const currentClient = useSelector(currentClientSelector)
    const form = useForm({
        defaultValues: {
            email: '',
            firstname: '',
            lastname: '',
            gender: '',
            avatar: '',
            phone: ''
        }
    })
    useEffect(() => {
        if (!_.isEmpty(currentClient)) {
            form.setValue('email', currentClient.email)
            form.setValue('firstname', currentClient.firstname)
            form.setValue('lastname', currentClient.lastname)
            form.setValue(
                'gender',
                currentClient.gender ? '1' : '0'
            )
            form.setValue(
                'avatar',
                currentClient.avatar ? currentClient.avatar : undefined
            )
            form.setValue('phone', currentClient.phone)
        }
        return () => {
            form.reset()
        }
    }, [currentClient, form])
    return (
        <Drawer isOpen={open} onClose={onClose}>
            <header className="font-bold bg-slate-50 p-4">
                Xem thông tin khách hàng
            </header>
            <div className="p-5">
                <form >
                    <div className="relative w-full mb-8">
                        <AvatarUpload form={form} name={'avatar'} />
                    </div>
                    <div className="relative w-full mb-2 flex space-x-4 ">
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
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
                        <div className="relative w-1/2">
                            <label
                                className="block uppercase text-xs font-bold mb-2"
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
                    <div className="relative w-full mb-2">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
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
                                    {...form.register('gender')}
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
                                    {...form.register('gender')}
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
                            disabled={
                                _.isEmpty(currentClient)
                                    ? false
                                    : true
                            }
                        />
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-xs font-bold mb-2"
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
                </form>
            </div>
        </Drawer>
    )
}

export default ClientForm
