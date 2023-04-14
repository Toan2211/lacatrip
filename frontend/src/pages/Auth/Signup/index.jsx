import React from 'react'
import logo from '@assets/img/logo.svg'
import { Link } from 'react-router-dom'
import { path } from '@constants/path'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '@components/InputField'
import Mybutton from '@components/MyButton'
import MySelect from '@components/MySelect'
import countrys from '@constants/countrys'
const countrysData = countrys.map(country =>
    Object({ value: country, label: country })
)
function Signup() {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        password: yup
            .string()
            .required('Password is required')
            .min(
                8,
                'Password is too short - should be 8 chars minimum.'
            ),
        firstname: yup.string().required('Firstname is required'),
        lastname: yup.string().required('Lastname is required'),
        gender: yup.boolean().required('Password is required'),
        country: yup.string().required('Country is required'),
        confirmpassword: yup
            .string()
            .oneOf(
                [yup.ref('password'), null],
                'Passwords must match'
            )
    })
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            gender: '',
            country: '',
            confirmpassword: ''
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = () => {
    }
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
                            Country
                        </label>
                        <MySelect
                            placeholder="Country"
                            form={form}
                            name="country"
                            options={countrysData}
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
                        >
                            Signup
                        </Mybutton>
                    </div>
                </form>
                <div className="flex flex-wrap mt-6 relative">
                    <div className="w-1/2">
                        <Link
                            className="text-blueGray-200"
                            to={path.forgotPass}
                        >
                            <small>Forgot password ?</small>
                        </Link>
                    </div>
                    <div className="w-1/2 text-right">
                        <Link
                            className="text-blueGray-200"
                            to={path.signin}
                        >
                            <small>Signin</small>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
