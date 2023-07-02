import {
    deleteNotify,
    readNotification
} from '@pages/Notification/notification.slice'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function NotificationCard({ notification }) {
    const [message, setMessage] = useState('')
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const handleActionClick = event => {
        event.preventDefault()
        setShowActionForm(!showActionForm)
    }
    const [showActionForm, setShowActionForm] = useState(false)
    const handleReadNotify = () => {
        dispatch(
            readNotification({
                tripId: notification.tripId,
                notificationId: notification.id
            })
        )
        setShowActionForm(false)
    }
    const handleDeleteNotify = () => {
        dispatch(deleteNotify(notification.id))

        setShowActionForm(false)
    }
    useEffect(() => {
        if (i18n.language === 'vn') {
            let temp = notification.message
            temp = temp.replace('already booked rooms in', 'đã đặt phòng tại khách sạn')
            temp = temp.replace('Please check', 'Hãy kiểm tra')
            temp = temp.replace('already booked', 'đã đặt ')
            temp = temp.replace('ticket', 'vé ')
            setMessage(temp)
        }
    }, [i18n, notification])
    return (
        <Link
            to={`/${notification.url}`}
            className="flex py-4 px-2 border-b border-gray-300 cursor-pointer gap-4 hover:bg-slate-50"
        >
            <div
                className="flex w-14 h-14"
                onClick={handleReadNotify}
            >
                <img
                    src={notification.sender.avatar}
                    className="w-full h-full rounded-full"
                />
            </div>
            <div className="flex-1" onClick={handleReadNotify}>
                <div className=" font-bold text-lg">
                    {t('bookingRequest')}
                </div>
                <div>
                    <span className="font-bold text-sm">
                        {notification.sender.firstname}{' '}
                        {notification.sender.lastname} :
                    </span>
                    <span className=" text-gray-700">
                        {' '}
                        {i18n.language === 'vn' ? message : notification.message}
                    </span>
                </div>
            </div>
            <div className="w-10 flex justify-center items-center relative">
                <div
                    className=" font-bold text-2xl"
                    onClick={handleActionClick}
                >
                    ...
                </div>
                {showActionForm && (
                    <ul
                        className=" absolute flex flex-col w-[10rem] top-14 border border-gray-300 rounded shadow z-10 bg-white gap-1 p-1"
                        onClick={e => e.preventDefault()}
                    >
                        <li
                            className="hover:bg-slate-100 p-1"
                            onClick={handleReadNotify}
                        >
                            {t('markReaded')}
                        </li>
                        <li
                            className="hover:bg-slate-100 p-1"
                            onClick={handleDeleteNotify}
                        >
                            {t('delete')}
                        </li>
                    </ul>
                )}
            </div>
            <div
                className="w-10 flex justify-center items-center"
                onClick={handleReadNotify}
            >
                {!notification.isReaded && (
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                )}
            </div>
        </Link>
    )
}

export default NotificationCard
