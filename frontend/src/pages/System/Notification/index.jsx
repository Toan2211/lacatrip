import {
    notificationsSelector,
    notificationPaginationSelector,
    getNotifications
} from '@pages/Notification/notification.slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotificationCard from './NotificationCard'
import { Pagination } from 'flowbite-react'

function NotificationSystem() {
    const notifications = useSelector(notificationsSelector)
    const pagination = useSelector(notificationPaginationSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'Thông báo'
    }, [])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            dispatch(
                getNotifications({
                    page: page
                })
            )
        }
    }
    return (
        <div className="max-w-[1535px] px-8 py-5 mt-[100px] md:mt-40 md:px-10 lg:mt-16 lg:px-20 mb-[20vh] pb-[100px] min-h-[100vh]">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex justify-center">
                        <h3 className="font-semibold text-lg text-blue-600">
                            Thông báo
                        </h3>
                    </div>
                </div>
            </div>
            <ul className=" flex flex-col lg:px-[20%]">
                {notifications.map(notify => (
                    <NotificationCard
                        notification={notify}
                        key={notify.id}
                    />
                ))}
            </ul>
            <div className="flex items-center justify-center mt-2">
                {pagination.totalPages > 1 && (
                    <Pagination
                        currentPage={Number(pagination.page)}
                        onPageChange={handlePageChange}
                        totalPages={Number(pagination.totalPages)}
                    />
                )}
            </div>
        </div>
    )
}

export default NotificationSystem
