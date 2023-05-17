import React from 'react'
import logo from '@assets/img/logo-off.svg'
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import { SiZalo } from 'react-icons/si'
function Footer() {
    return (
        <div className="max-w-[1535px] px-10 py-5 bg-slate-50 mt-4 flex items-center flex-col md:flex-row justify-center">
            <div className="flex-1 flex justify-center mb-4 md:mb-0">
                <div>
                    <img
                        src={logo}
                        alt="logo-lacatrip"
                        className="w-1/2 h-full mx-auto"
                    />
                </div>
            </div>
            <div className="flex-1 justify-center font-semibold">
                <ul className="cursor-pointer flex gap-3 justify-center flex-col md:flex-row">
                    <li>Terms & Conditions</li>
                    <li>Privacy</li>
                    <li>Policy</li>
                    <li>Cookies</li>
                </ul>
            </div>
            <div className="flex-1 flex gap-4 justify-center">
                <span className="cursor-pointer mr-4 h-8 w-8 rounded-full flex justify-center bg-white items-center">
                    <FiFacebook />
                </span>
                <span className="cursor-pointer mr-4 h-8 w-8 rounded-full flex justify-center bg-white items-center">
                    <FiInstagram />
                </span>
                <span className="cursor-pointer mr-4 h-8 w-8 rounded-full flex justify-center bg-white items-center">
                    <SiZalo />
                </span>
                <span className="cursor-pointer mr-4 h-8 w-8 rounded-full flex justify-center bg-white items-center">
                    <FiYoutube />
                </span>
            </div>
        </div>
    )
}

export default Footer
