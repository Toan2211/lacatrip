import UserDropdown from '@components/Dropdown/UserDropdown'
import { path } from '@constants/path'
import { countNotReadedSelector } from '@pages/Notification/notification.slice'
import LanguageDropdown from '@components/Dropdown/LanguageDropdown'
import React from 'react'
import { GrNotification } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
function SystemNavBar() {
    const { t } = useTranslation()
    const countNotReaded = useSelector(countNotReadedSelector)
    return (
        <>
            <nav className="relative top-0 left-0 w-full z-10 bg-slate-100 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <div className=" text-sm uppercase hidden lg:inline-block font-semibold">
                    </div>
                    <div className="flex gap-2 items-center">
                        <Link
                            to={path.notificationSystem}
                            className={`${
                                location.pathname.includes(
                                    path.notificationSystem
                                )
                                    ? 'bg-white border-slate-200 '
                                    : 'border-transparent '
                            } hidden lg:flex gap-1 items-center font-medium hover:bg-white hover:border-slate-200 border-2  px-4 py-2 rounded-xl`}
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
                            <span>{t('notifications')}</span>
                        </Link>
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <UserDropdown />
                        </ul>
                        <div>
                            <LanguageDropdown />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SystemNavBar
