import React from 'react'
import logo from '@assets/img/logo-off.svg'
import { Link } from 'react-router-dom'
import { path } from '@constants/path'
import { GrNotification } from 'react-icons/gr'
import { SlPaperPlane } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import UserDropdown from '@components/Dropdown/UserDropdown'

function Header() {
    const user = useSelector(selectUser)
    return (
        <div className="h-[80px] fixed w-full top-0 left-0 border-b-2 bg-white flex px-10 max-w-[1535px]">
            <div className="flex flex-1 items-center justify-start">
                <Link to={path.landingPage} className="w-1/2 h-5">
                    <img src={logo} alt="logo-lacatrip" />
                </Link>
            </div>
            <div className="flex-1"></div>
            <div className="flex-1 flex items-center gap-4 justify-end">
                <Link
                    to={path.landingPage}
                    className="flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  border-transparent px-4 py-2 rounded-xl"
                >
                    <span>
                        <SlPaperPlane />
                    </span>
                    <span>Trips</span>
                </Link>
                <div className="flex gap-1 items-center cursor-pointer hover:bg-slate-100 hover:border-slate-200 border-2  border-transparent px-4 py-2 rounded-xl">
                    <span className="relative">
                        <GrNotification />
                        <span className="absolute top-[-14px] right-[-10px] z-10 flex justify-center items-center w-5 h-5 rounded-xl bg-red-600 text-white text-center">
                            5
                        </span>
                    </span>
                    <span>Notifications</span>
                </div>
                {user.id ? (
                    <UserDropdown />
                ) : (
                    <Link
                        to={path.signin}
                        className="flex gap-1 items-center cursor-pointer bg-slate-100 border-slate-200 border-2  border-transparent px-4 py-2 rounded-xl"
                    >
                        <span>Signin</span>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header
