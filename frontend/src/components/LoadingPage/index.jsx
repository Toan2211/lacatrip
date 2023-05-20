import React from 'react'

function LoadingPage() {
    return (
        <div className="fixed w-screen h-screen flex justify-center items-center bg-white z-[9999] top-0">
            <div className="inline-block h-[30px] w-[30px] animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    )
}

export default LoadingPage
