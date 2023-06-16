import React from 'react'

function PaymentFail() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500 to-red-600">
            <div className="bg-white rounded-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-6">
                    Payment Failed
                </h1>
                <p className="text-lg mb-8">
                    Sorry, there was an error processing your payment.
                </p>
                <a
                    href="/"
                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    )
}

export default PaymentFail
