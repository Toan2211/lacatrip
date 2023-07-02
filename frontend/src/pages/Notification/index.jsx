import React, { useEffect } from 'react'
import NotificationCard from './NotificationCard'
import { useSelector } from 'react-redux'
import { notificationsSelector } from './notification.slice'
import { useTranslation } from 'react-i18next'

function Notification() {
    const { t } = useTranslation()
    const notifications = useSelector(notificationsSelector)
    useEffect(() => {
        document.title = t('notifications')
    }, [t])
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[100vh]">
            <header className="font-bold text-2xl text-center  border-b-2 border-slate-200 py-2">
                {t('notifications')}
            </header>
            <ul className=" flex flex-col lg:px-[20%]">
                {notifications.map(notify => (
                    <NotificationCard
                        key={notify.id}
                        notification={notify}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Notification
