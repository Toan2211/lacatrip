import React, { useState } from 'react'
import logo from '@assets/img/logo-off.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { path } from '@constants/path'
import { GrNotification } from 'react-icons/gr'
import { SlPaperPlane } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import UserDropdown from '@components/Dropdown/UserDropdown'
import SidebarMobile from '@components/SidebarMobile'
import { countNotReadedSelector } from '@pages/Notification/notification.slice'
import { SiGooglecalendar } from 'react-icons/si'

function Header() {
    const user = useSelector(selectUser)
    const location = useLocation()
    const [openForm, setOpenForm] = useState(false)
    const countNotReaded = useSelector(countNotReadedSelector)
    const onClose = () => {
        setOpenForm(false)
    }
    return (
        <>
            <div className="h-[80px] fixed w-full top-0 left-0 border-b-2 bg-white flex px-10 max-w-[1535px] z-30">
                <div className="flex flex-1 items-center justify-start">
                    <Link
                        to={path.landingPage}
                        className="w-1/2 h-5 hidden lg:block"
                    >
                        <img src={logo} alt="logo-lacatrip" />
                    </Link>
                    <div className="w-1/6 h-5 cursor-pointer block lg:hidden">
                        <svg
                            fill="#000000"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 297 297"
                            onClick={() => setOpenForm(!openForm)}
                        >
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428
				c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z"
                                        />
                                        <path
                                            d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428
				c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z"
                                        />
                                        <path
                                            d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428
				c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="flex-1 justify-center items-center">
                    <Link
                        to={path.landingPage}
                        className="w-full h-full block lg:hidden"
                    >
                        <img
                            src={logo}
                            alt="logo-lacatrip"
                            className="w-full h-full"
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center gap-4 justify-end">
                    <Link
                        to={path.bookingme}
                        className={`${
                            location.pathname.includes(
                                path.bookingme
                            )
                                ? 'bg-slate-100 border-slate-200 '
                                : 'border-transparent '
                        } hidden lg:flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  px-4 py-2 rounded-xl`}
                    >
                        <span>
                            <SiGooglecalendar />
                        </span>
                        <span>Bookings</span>
                    </Link>
                    <Link
                        to={path.clientTrips}
                        className={`${
                            location.pathname.includes(
                                path.clientTrips
                            )
                                ? 'bg-slate-100 border-slate-200 '
                                : 'border-transparent '
                        } hidden lg:flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  px-4 py-2 rounded-xl`}
                    >
                        <span>
                            <SlPaperPlane />
                        </span>
                        <span>Trips</span>
                    </Link>
                    <Link
                        to={path.notification}
                        className={`${
                            location.pathname.includes(
                                path.notification
                            )
                                ? 'bg-slate-100 border-slate-200 '
                                : 'border-transparent '
                        } hidden lg:flex gap-1 items-center font-medium hover:bg-slate-100 hover:border-slate-200 border-2  px-4 py-2 rounded-xl`}
                    >
                        {' '}
                        <span className="relative">
                            <GrNotification />
                            {!!countNotReaded && (
                                <span className="absolute top-[-14px] right-[-10px] z-10 flex justify-center items-center w-5 h-5 rounded-xl bg-red-600 text-white text-center">
                                    {countNotReaded}
                                </span>
                            )}
                        </span>
                        <span>Notifications</span>
                    </Link>
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
            <SidebarMobile isOpen={openForm} onClose={onClose}>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none text-bl px-4">
                    <li className="items-center border-b">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-600 hover:opacity-75 text-md uppercase py-3 font-bold flex gap-3'
                                    : 'hover:text-blue-600 text-md uppercase py-3 font-bold flex gap-3'
                            }
                            to={path.employees}
                        >
                            <span>
                                <SlPaperPlane />
                            </span>
                            Trips
                        </NavLink>
                    </li>
                    <li className="items-center border-b">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-blue-600 hover:opacity-75 text-md uppercase py-3 font-bold flex gap-3'
                                    : 'hover:text-blue-600 text-md uppercase py-3 font-bold flex gap-3'
                            }
                            to={path.clients}
                        >
                            <span>
                                <GrNotification />
                            </span>
                            Notifications
                        </NavLink>
                    </li>
                </ul>
            </SidebarMobile>
        </>
    )
}

export default Header
