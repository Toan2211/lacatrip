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
        const filters = { ...queryParams, page: page }
        navigate(`?${queryString.stringify(filters)}`)
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
                                <div className="absolute bottom-0 flex flex-col items-center hidden mb-7 group-hover:flex">
                                    <span className="relative z-10 p-2 text-xs font-medium leading-none text-gray-900 whitespace-no-wrap border-gray-900 rounded-lg shadow-sm">
                                        Create
                                    </span>
                                    <div className="w-3 h-3 -mt-2 rotate-45 border-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    Fullname
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    Email
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    PhoneNumber
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    Gender
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    Status
                                </th>
                                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-100">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees &&
                                employees.map(employee => (
                                    <tr key={employee.id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                            <span className="ml-3 font-bold">
                                                {`${employee.firstname} ${employee.lastname}`}
                                            </span>
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {employee.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {employee.phone}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {employee.gender
                                                ? 'Male'
                                                : 'Female'}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
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
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <nav
                aria-label="Page navigation example"
                className="mt-10 flex justify-center"
            >
                <ul className="inline-flex -space-x-px">
                    <li>
                        <div
                            onClick={prevPage}
                            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </li>
                    {Array.from(
                        { length: pagination.totalPages },
                        (value, key) => (
                            <li
                                key={key + 1}
                                className={`${
                                    pagination.page === key + 1
                                        ? 'border-blue-500 bg-blue-500'
                                        : ''
                                } `}
                            >
                                <div
                                    onClick={() =>
                                        handlePageChange(key + 1)
                                    }
                                    className={
                                        'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'
                                    }
                                >
                                    {key + 1}
                                </div>
                            </li>
                        )
                    )}
                    <li>
                        <div
                            onClick={nextPage}
                            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </li>
                </ul>
            </nav>
            <EmployeeForm open={openForm} onClose={onClose} />
        </div>
    )
}

export default Employees
