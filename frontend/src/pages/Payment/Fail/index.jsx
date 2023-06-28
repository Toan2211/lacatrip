import React, { useEffect } from 'react'

function PaymentFail() {
    useEffect(() => {
        document.title = 'Payment Fail'
    }, [])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500 to-red-600">
            <div className="bg-white rounded-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-6">
                    Thanh toán thất bại
                </h1>
                <p className="text-lg mb-8">
                    Xin lỗi, đã có lỗi trong quá trình thanh toán. Vui lòng kiểm tra số dư của bạn !
                </p>
                <a
                    href="/"
                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700"
                >
                    Trở lại
                </a>
            </div>
        </div>
    )
}

export default PaymentFail
