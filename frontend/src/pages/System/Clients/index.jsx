import { Pagination, Table } from 'flowbite-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clientsSelector,
    getClients,
    paginationClientSelector,
    setCurrentClient,
    toggleStatusClient
} from './client.slice'
import { useLocation, useNavigate } from 'react-router'
import queryString from 'query-string'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import ToggleButton from '@components/ToggleButton'
import Mybutton from '@components/MyButton'
import ClientForm from './ClientForm'

function Clients() {
    const dispatch = useDispatch()
    const pagination = useSelector(paginationClientSelector)
    const clients = useSelector(clientsSelector)
    const [openForm, setOpenForm] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || ''
        }
    }, [location.search])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    useEffect(() => {
        dispatch(getClients(queryParams))
    }, [dispatch, queryParams])
    const handleToggleStatusClient = clientId => {
        try {
            const res = dispatch(toggleStatusClient(clientId))
            unwrapResult(res)
            toast.success('Thay đổi trạng thái thành công', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    const handleSelectClient = client => {
        dispatch(setCurrentClient(client))
        setOpenForm(true)
    }
    const onClose = () => {
        setOpenForm(false)
        dispatch(setCurrentClient({}))
    }
    useEffect(() => {
        document.title = 'Quản lý khách du lịch'
    }, [])
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Quản lý khách du lịch
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Họ tên</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>
                                Số điện thoại
                            </Table.HeadCell>
                            <Table.HeadCell>Giới tính</Table.HeadCell>
                            <Table.HeadCell>Trạng thái</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {clients &&
                                clients.map(client => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={client.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {`${client.firstname} ${client.lastname}`}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {client.email}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {client.phone}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {client.gender
                                                ? 'Nam'
                                                : 'Nữ'}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ToggleButton
                                                status={!client.block}
                                                onClick={() =>
                                                    handleToggleStatusClient(
                                                        client.id
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Mybutton
                                                className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                onClick={() =>
                                                    handleSelectClient(
                                                        client
                                                    )
                                                }
                                            >
                                                <svg
                                                    fill="#000000"
                                                    version="1.1"
                                                    id="Capa_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 442.04 442.04"
                                                    xmlSpace="preserve"
                                                    className="h-6 w-6"
                                                >
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"
                                                            />
                                                        </g>
                                                        <g>
                                                            <path
                                                                d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"
                                                            />
                                                        </g>
                                                        <g>
                                                            <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </Mybutton>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
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
            <ClientForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default Clients
