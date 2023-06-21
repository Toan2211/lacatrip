import { path } from '@constants/path'
import { Pagination, Table, Tooltip } from 'flowbite-react'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    getHotels,
    hotelsSelector,
    paginationHotel,
    setCurrentHotel,
    togglePublic
} from './hotel.slice'
import queryString from 'query-string'
import ToggleButton from '@components/ToggleButton'
import Mybutton from '@components/MyButton'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import InputField from '@components/InputField'
import MySelect from '@components/MySelect'
import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import {
    getServiceManagers,
    serviceManagersSelector
} from '../ServiceManagers/servicemanager.slice'
import { selectUser } from '@pages/Auth/auth.slice'

function Hotel() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hotels = useSelector(hotelsSelector)
    const profile = useSelector(selectUser)
    const pagination = useSelector(paginationHotel)
    const location = useLocation()
    const provinces = useSelector(provincesSelector)
    const serviceManagers = useSelector(serviceManagersSelector)
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            key: params.key || '',
            provinceId: params.provinceId || null,
            serviceManagerId: params.serviceManagerId || ''
        }
    }, [location.search])
    useEffect(() => {
        if (profile.serviceManagerId)
            dispatch(
                getHotels({
                    ...queryParams,
                    serviceManagerId: profile.serviceManagerId
                })
            )
        else dispatch(getHotels({ ...queryParams }))
    }, [queryParams, dispatch, profile])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const handleSelectItem = hotel => {
        dispatch(setCurrentHotel(hotel))
        navigate(`${path.formHotel}/${hotel.id}`)
    }
    const handleTogglePublic = async hotelId => {
        try {
            const res = await dispatch(togglePublic(hotelId))
            unwrapResult(res)
            toast.success('Change status hotel successful', {
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
    const form = useForm({
        defaultValues: {
            serviceManagerId: '',
            provinceId: undefined,
            key: ''
        }
    })
    const handleResetSearch = () => {
        form.setValue('serviceManagerId', '')
        form.setValue('provinceId', '')
        form.setValue('key', '')
    }
    const handleSubmitSearch = data => {
        const filters = {
            ...queryParams,
            serviceManagerId: data.serviceManagerId,
            provinceId: data.provinceId,
            key: data.key
        }
        navigate(`?${queryString.stringify(filters)}`)
    }

    useEffect(() => {
        document.title = 'Hotels'
        if (serviceManagers.length === 0)
            dispatch(getServiceManagers({ limit: 1000 }))
    }, [dispatch, serviceManagers])
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                Manage Hotels
                            </h3>
                            {!profile.serviceManagerId && (<div className="relative flex flex-col items-center group w-10">
                                <Tooltip
                                    content="Create"
                                    style="light"
                                >
                                    <button
                                        className="inline-flex items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150  bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500 ml-4"
                                        onClick={() =>
                                            navigate(path.formHotel)
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
                            </div>)}
                        </div>
                        <form
                            className="flex gap-5 w-full mt-4"
                            onSubmit={form.handleSubmit(
                                handleSubmitSearch
                            )}
                        >
                            <div className="flex-1">
                                <InputField
                                    placeholder="Name Hotel"
                                    form={form}
                                    name="key"
                                />
                            </div>
                            {!profile.serviceManagerId && (
                                <div className="flex-1">
                                    <MySelect
                                        placeholder="Service Manager"
                                        form={form}
                                        name="serviceManagerId"
                                        options={serviceManagers.map(
                                            servicemanager => ({
                                                value: servicemanager.id,
                                                label:
                                                    servicemanager
                                                        .user
                                                        .firstname +
                                                    servicemanager
                                                        .user.lastname
                                            })
                                        )}
                                    />
                                </div>
                            )}

                            <div className="flex-1">
                                <MySelect
                                    placeholder="Province"
                                    form={form}
                                    name="provinceId"
                                    options={provinces.map(
                                        province => ({
                                            value: province.id,
                                            label: province.name
                                        })
                                    )}
                                />
                            </div>
                            <div className="flex-1 flex gap-3">
                                <div className="flex-1">
                                    <Mybutton
                                        type="submit"
                                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    >
                                        Search
                                    </Mybutton>
                                </div>
                                <div className="flex-1">
                                    <Mybutton
                                        type="submit"
                                        onClick={() =>
                                            handleResetSearch()
                                        }
                                        className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    >
                                        Reset
                                    </Mybutton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>
                                Service Manager
                            </Table.HeadCell>
                            <Table.HeadCell>Province</Table.HeadCell>
                            <Table.HeadCell>Rating</Table.HeadCell>
                            <Table.HeadCell>Public</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {hotels &&
                                hotels.map(hotel => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={hotel.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {hotel.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.serviceManager.user
                                                .firstname +
                                                hotel.serviceManager
                                                    .user.lastname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.province.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {hotel.rating}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ToggleButton
                                                status={hotel.public}
                                                onClick={() =>
                                                    handleTogglePublic(
                                                        hotel.id
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="flex gap-4">
                                            <Tooltip
                                                content="Detail Hotel"
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    onClick={() =>
                                                        handleSelectItem(
                                                            hotel
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
                                            </Tooltip>

                                            <Tooltip
                                                content="Manage Rooms"
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    // eslint-disable-next-line quotes
                                                    onClick={() =>
                                                        navigate(
                                                            `/system/hotels/${hotel.id}/rooms`
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        fill="#000000"
                                                        viewBox="0 0 512 512"
                                                        version="1.1"
                                                        className="h-6 w-6"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g id="bed-hotel-heart-love-valentine">
                                                            <path d="M440,358.242V312c0-16.36-9.898-30.419-24-36.609V200c0-22.055-17.945-40-40-40H271.72l30.042-30.37   c11.85-11.979,13.889-31.23,3.614-44.605C292.961,68.863,269.847,67.782,256,81.78c-13.847-13.998-36.961-12.917-49.375,3.245   c-10.275,13.376-8.235,32.626,3.614,44.605L240.28,160H136c-22.055,0-40,17.945-40,40v75.391C81.898,281.581,72,295.64,72,312   v46.242c-4.875,4.396-8,10.692-8,17.758v8c0,10.416,6.708,19.212,16,22.525V424c0,13.234,10.766,24,24,24h16   c13.234,0,24-10.766,24-24v-16h224v16c0,13.234,10.766,24,24,24h16c13.234,0,24-10.766,24-24v-17.474   c9.292-3.313,16-12.11,16-22.526v-8C448,368.935,444.875,362.638,440,358.242z M112,200c0-13.234,10.766-24,24-24h240   c13.234,0,24,10.766,24,24v72h-24v-16c0-13.234-10.766-24-24-24h-48c-13.234,0-24,10.766-24,24v16h-48v-16   c0-13.234-10.766-24-24-24h-48c-13.234,0-24,10.766-24,24v16h-24V200z M432,384c0,4.414-3.59,8-8,8h-48H136H88c-4.41,0-8-3.586-8-8   v-8c0-4.711,4.193-8,8-8h336c3.917,0,8,3.375,8,8V384z" />
                                                        </g>

                                                        <g id="Layer_1" />
                                                    </svg>
                                                </Mybutton>
                                            </Tooltip>
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
        </div>
    )
}

export default Hotel
