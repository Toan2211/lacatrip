import React from 'react'
import logo from '@assets/img/logo-off.svg'
import { FiSmartphone } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineClockCircle } from 'react-icons/ai'
function Footer() {
    return (
        <div className="max-w-[1535px] px-10 py-5 bg-slate-50 h-[30vh] mt-4 flex">
            <div className="flex-1">
                <div>
                    <img
                        src={logo}
                        alt="logo-lacatrip"
                        className="w-1/2 h-full"
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col font-medium">
                <div className="font-bold text-3xl mb-4">
                    Contact us
                </div>
                <div className='flex items-center gap-3'>
                    <span>
                        <FiSmartphone />
                    </span>
                    <span>0123 - 456 - 789</span>
                </div>
                <div className='flex items-center gap-3'>
                    <span>
                        <IoLocationOutline />
                    </span>
                    <span>53 Nguyen Luong Bang, Da Nang</span>
                </div>
                <div className='flex items-center gap-3'>
                    <span><AiOutlineClockCircle /></span>
                    <span>Every Day 8.00 - 18.00</span>
                </div>
            </div>
            <div className="flex-1">
                <header></header>
            </div>
        </div>
    )
}

export default Footer
