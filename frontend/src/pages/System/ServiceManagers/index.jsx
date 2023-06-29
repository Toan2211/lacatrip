import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    getServiceManagers,
    paginationServiceManagerSelector,
    serviceManagersSelector,
    setCurrentServicemanager,
    toggleStatusServiceManager
} from './servicemanager.slice'
import queryString from 'query-string'
import { Pagination, Table, Tooltip } from 'flowbite-react'
import Mybutton from '@components/MyButton'
import ToggleButton from '@components/ToggleButton'
import ServiceManagerForm from './ServiceManagerForm'
import { useTranslation } from 'react-i18next'

function ServiceManger() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const serviceManagers = useSelector(serviceManagersSelector)
    const pagination = useSelector(paginationServiceManagerSelector)
    const [openForm, setOpenForm] = useState(false)
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || ''
        }
    }, [location.search])
    useEffect(() => {
        dispatch(getServiceManagers(queryParams))
    }, [queryParams, dispatch])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const handleCreateServiceManager = () => {
        setOpenForm(true)
    }
    const handleSelectServiceManager = serviceManager => {
        dispatch(setCurrentServicemanager(serviceManager))
        setOpenForm(true)
    }
    const toggleServiceManagerStatus = userId => {
        dispatch(toggleStatusServiceManager(userId))
    }
    const onClose = () => {
        setOpenForm(false)
        dispatch(setCurrentServicemanager({}))
    }
    useEffect(() => {
        document.title = t('manageServiceManagers')
    }, [t])
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                {t('manageServiceManagers')}
                            </h3>
                            <div className="relative flex flex-col items-center group w-10">
                                <Tooltip
                                    content={t('create')}
                                    style="light"
                                >
                                    <button
                                        className="inline-flex items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150  bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500 ml-4"
                                        onClick={() =>
                                            handleCreateServiceManager()
                                        }
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>
                                {t('fullname')}
                            </Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>
                                {t('phone')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('gender')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('status')}
                            </Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {serviceManagers &&
                                serviceManagers.map(
                                    serviceManager => (
                                        <Table.Row
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            key={
                                                serviceManager.user.id
                                            }
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {`${serviceManager.user.firstname} ${serviceManager.user.lastname}`}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    serviceManager
                                                        .user.email
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {
                                                    serviceManager
                                                        .user.phone
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                {serviceManager.user
                                                    .gender
                                                    ? t('male')
                                                    : t('female')}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <ToggleButton
                                                    status={
                                                        !serviceManager
                                                            .user
                                                            .block
                                                    }
                                                    onClick={() =>
                                                        toggleServiceManagerStatus(
                                                            serviceManager.userId
                                                        )
                                                    }
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    onClick={() =>
                                                        handleSelectServiceManager(
                                                            serviceManager
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </Mybutton>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={Number(pagination.page)}
                        onPageChange={handlePageChange}
                        totalPages={Number(pagination.totalPages)}
                    />
                </div>
            )}
            <ServiceManagerForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default ServiceManger
