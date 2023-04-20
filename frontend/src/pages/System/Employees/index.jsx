import Mybutton from '@components/MyButton'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    employeesSelector,
    getEmployees,
    paginationEmployeeSelector,
    setCurrentEmployee,
    toggleStatusEmployee
} from './employee.slice.js'
import EmployeeForm from './EmployeeForm/index.jsx'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import ToggleButton from '@components/ToggleButton/index.jsx'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { Pagination, Table, Tooltip } from 'flowbite-react'
function Employees() {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const employees = useSelector(employeesSelector)
    const pagination = useSelector(paginationEmployeeSelector)
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
        dispath(getEmployees())
    }, [dispath])
    const showDrawer = () => {
        setOpenForm(true)
    }

    const onClose = () => {
        setOpenForm(false)
        dispath(setCurrentEmployee({}))
    }
    const handleSelectEmployee = employee => {
        dispath(setCurrentEmployee(employee))
        setOpenForm(true)
    }
    const handleCreateEmployee = () => {
        showDrawer()
    }
    const nextPage = () => {
        if (pagination.page < pagination.totalPages) {
            const filters = {
                ...queryParams,
                page: +pagination.page + 1
            }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const prevPage = () => {
        if (pagination.page > 1) {
            const filters = {
                ...queryParams,
                page: +pagination.page - 1
            }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    useEffect(() => {
        dispath(getEmployees(queryParams))
    }, [queryParams, dispath])
    const handleToggleStatusEmployee = employeeId => {
        try {
            const res = dispath(toggleStatusEmployee(employeeId))
            unwrapResult(res)
            toast.success('Change status employee successful', {
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
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Manage Employees
                            </h3>
                            <div className="relative flex flex-col items-center group w-10">
                                <Tooltip content="Create" style="light">
                                    <button
                                        className="inline-flex items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150  bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500 ml-4"
                                        onClick={() =>
                                            handleCreateEmployee()
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
                            <Table.HeadCell>Fullname</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>
                                PhoneNumber
                            </Table.HeadCell>
                            <Table.HeadCell>Gender</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {employees &&
                                employees.map(employee => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={employee.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {`${employee.firstname} ${employee.lastname}`}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {employee.email}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {employee.phone}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {employee.gender
                                                ? 'Male'
                                                : 'Female'}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ToggleButton
                                                status={
                                                    !employee.block
                                                }
                                                onClick={() =>
                                                    handleToggleStatusEmployee(
                                                        employee.id
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Mybutton
                                                className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                onClick={() =>
                                                    handleSelectEmployee(
                                                        employee
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
                                ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {pagination.page && (
                <div className="flex items-center justify-center text-center">
                    <Pagination
                        currentPage={Number(pagination.page)}
                        onPageChange={handlePageChange}
                        totalPages={Number(pagination.totalPages)}
                    />
                </div>
            )}
            <EmployeeForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default Employees
