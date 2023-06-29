import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '@assets/img/logo.svg'
import { BsFillPersonFill, BsFillTicketFill } from 'react-icons/bs'
import { path } from '@constants/path'
import { FaHotel } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectUser } from '@pages/Auth/auth.slice'
import { BiRestaurant } from 'react-icons/bi'
import ROLE from '@constants/ROLE'
import {
    MdOutlineAttachMoney,
    MdOutlineTravelExplore
} from 'react-icons/md'
import { useTranslation } from 'react-i18next'
export default function Sidebar() {
    const { t } = useTranslation()
    const [collapseShow, setCollapseShow] = React.useState('hidden')
    const currentUser = useSelector(selectUser)
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() =>
                            setCollapseShow('bg-white m-2 py-3 px-6')
                        }
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="flex justify-center items-center p-4 px-0">
                        <img
                            alt="logo"
                            src={logo}
                            className="w-full"
                        />
                    </div>
                    <div
                        className={
                            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
                            collapseShow
                        }
                    >
                        {(currentUser.role.name === ROLE.ADMIN ||
                            currentUser.role.name ===
                                ROLE.EMPLOYEE) && (
                            <>
                                <hr className="my-2 md:min-w-full" />
                                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                                    {t('manageUser')}
                                </h6>
                                <ul className="md:flex-col md:min-w-full flex flex-col list-none text-bl">
                                    <li className="items-center ">
                                        <NavLink
                                            className={({
                                                isActive
                                            }) =>
                                                isActive
                                                    ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                                    : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                            }
                                            to={path.employees}
                                        >
                                            <span className="mr-2">
                                                <BsFillPersonFill />
                                            </span>
                                            {t('employees')}
                                        </NavLink>
                                    </li>
                                    <li className="items-center ">
                                        <NavLink
                                            className={({
                                                isActive
                                            }) =>
                                                isActive
                                                    ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                                    : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                            }
                                            to={path.clients}
                                        >
                                            <span className="mr-2">
                                                <BsFillPersonFill />
                                            </span>
                                            {t('clients')}
                                        </NavLink>
                                    </li>
                                    <li className="items-center ">
                                        <NavLink
                                            className={({
                                                isActive
                                            }) =>
                                                isActive
                                                    ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                                    : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                            }
                                            to={path.serviceManagers}
                                        >
                                            <span className="mr-2">
                                                <BsFillPersonFill />
                                            </span>
                                            {t('serviceManagers')}
                                        </NavLink>
                                    </li>
                                </ul>
                            </>
                        )}
                        <hr className="my-2 md:min-w-full" />
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            {t('manageTravelService')}
                        </h6>
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none text-bl">
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={path.hotels}
                                >
                                    <span className="mr-2">
                                        <FaHotel />
                                    </span>
                                    {t('hotel')}
                                </NavLink>
                            </li>
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={path.restaurants}
                                >
                                    <span className="mr-2">
                                        <BiRestaurant />
                                    </span>
                                    {t('restaurant')}
                                </NavLink>
                            </li>
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={path.destinations}
                                >
                                    <span className="mr-2">
                                        <MdOutlineTravelExplore />
                                    </span>
                                    {t('tour')}
                                </NavLink>
                            </li>
                        </ul>
                        <hr className="my-2 md:min-w-full" />
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            {t('manageBooking')}
                        </h6>
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none text-bl">
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={path.bookingHotelSystem}
                                >
                                    <span className="mr-2">
                                        <FaHotel />
                                    </span>
                                    {t('bookingHotel')}
                                </NavLink>
                            </li>
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={
                                        path.bookingDestinationTravelSystem
                                    }
                                >
                                    <span className="mr-2">
                                        <BsFillTicketFill />
                                    </span>
                                    {t('bookingDestinationTravel')}
                                </NavLink>
                            </li>
                        </ul>
                        <hr className="my-2 md:min-w-full" />
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            {t('manageRevenue')}
                        </h6>
                        <ul className="md:flex-col md:min-w-full flex flex-col list-none text-bl">
                            <li className="items-center ">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                            : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                    }
                                    to={path.revenue}
                                >
                                    <span className="mr-2">
                                        <MdOutlineAttachMoney />
                                    </span>
                                    {t('revenueBooking')}
                                </NavLink>
                            </li>
                            {currentUser.role.name === ROLE.ADMIN && (
                                <li className="items-center ">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-blue-600 hover:opacity-75 text-xs uppercase py-3 font-bold flex'
                                                : 'hover:text-blue-600 text-xs uppercase py-3 font-bold flex'
                                        }
                                        to={path.trackingPayment}
                                    >
                                        <span className="mr-2">
                                            <MdOutlineAttachMoney />
                                        </span>
                                        {t('trackingPayment')}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
