import React, { useEffect } from 'react'
import NotificationCard from './NotificationCard'
import { useSelector } from 'react-redux'
import { notificationsSelector } from './notification.slice'

function Notification() {
    const notifications = useSelector(notificationsSelector)
    useEffect(() => {
        document.title = 'Notifications'
    }, [])
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[100vh]">
            <header className="font-bold text-2xl text-center  border-b-2 border-slate-200 py-2">
                Notifications
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
