import React from 'react'

function Maker({ data }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center w-[25px] h-[40px] bg-red-500 rounded-2xl text-[12px]">
                <span>{data ? data : 'Here'}</span>
            </div>
            <div className="bg-red-500 rounded-full w-3 h-3"></div>
        </div>
    )
}

export default Maker
