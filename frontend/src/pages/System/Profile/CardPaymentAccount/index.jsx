import { selectUser } from '@pages/Auth/auth.slice'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Mybutton from '@components/MyButton'
import InputField from '@components/InputField'
import { updatePaymentAccount } from '@pages/System/ServiceManagers/servicemanager.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { setPaymentAccountSV } from '@pages/Auth/auth.slice'
function CardPaymentAccount() {
    const user = useSelector(selectUser)
    // const loading = useSelector(loadingChangePassSelector)
    const dispatch = useDispatch()
    const schema = yup.object().shape({
        paymentAccount: yup
            .string()
            .required('Payment Account is required')
            .email('Invalid Payment Account')
    })
    const form = useForm({
        defaultValues: {
            id: user.serviceManagerId,
            paymentAccount: user.paymentAccount
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async data => {
        try {
            const res = await dispatch(updatePaymentAccount(data))
            unwrapResult(res)
            toast.success('Update user successful', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
            dispatch(setPaymentAccountSV(data.paymentAccount))
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
                            Change Payment Account (Payment Receive
                            Money From Booking)
                        </h6>
                        <Mybutton
                            className=" bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/8 ease-linear transition-all duration-150"
                            type="submit"
                            // isloading={+loading}
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
                                    Payment Account
                                </label>
                                <InputField
                                    placeholder="Payment Account"
                                    type="email"
                                    form={form}
                                    name="paymentAccount"
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

export default CardPaymentAccount
