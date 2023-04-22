import Drawer from '@components/Drawer'
import AvatarUpload from '@components/AvatarUpload'
import React, { useEffect } from 'react'
import InputField from '@components/InputField'
import { useSelector } from 'react-redux'
import { currentClientSelector } from '../client.slice'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'

function ClientForm({ onClose, open }) {
    const currentClient = useSelector(currentClientSelector)
    const form = useForm({
        defaultValues: {
            email: '',
            firstname: '',
            lastname: '',
            gender: '',
            country: '',
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
            form.setValue('country', currentClient.country)
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
                View Client
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
                </form>
            </div>
        </Drawer>
    )
}

export default ClientForm
