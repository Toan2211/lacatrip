import { provincesSelector } from '@pages/CommonProperty/baseproperty'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    getServiceManagers,
    serviceManagersSelector
} from '../ServiceManagers/servicemanager.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import queryString from 'query-string'
import {
    destinationsSelector,
    getDestinations,
    paginationDestinationSelector,
    setCurrentDestination,
    togglePublic
} from './destination.slice'
import { path } from '@constants/path'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Pagination, Table, Tooltip } from 'flowbite-react'
import InputField from '@components/InputField'
import MySelect from '@components/MySelect'
import Mybutton from '@components/MyButton'
import ToggleButton from '@components/ToggleButton'
import Itinerary from './Itinerary'
import { GiWavyItinerary } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'
function DestinationTravel() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const destinations = useSelector(destinationsSelector)
    const profile = useSelector(selectUser)
    const pagination = useSelector(paginationDestinationSelector)
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
                getDestinations({
                    ...queryParams,
                    serviceManagerId: profile.serviceManagerId
                })
            )
        else dispatch(getDestinations({ ...queryParams }))
    }, [queryParams, dispatch, profile])
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    const handleSelectItem = destination => {
        dispatch(setCurrentDestination(destination))
        navigate(`${path.formDestination}/${destination.id}`)
    }
    const handleTogglePublic = async destinationId => {
        try {
            const res = await dispatch(togglePublic(destinationId))
            unwrapResult(res)
            toast.success(`${t('change')} ${t('status').toLowerCase()} ${t('destinationTravel')} ${t('successfully')}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        } catch (error) {
            toast.error(t(error.message), {
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
        document.title = t('manageDestiantionTravel')
        dispatch(getServiceManagers({ limit: 1000 }))
        // dispatch(getDestinations({ limit: 1000 }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t])
    const [openForm, setOpenForm] = useState(false)
    const onClose = () => {
        setOpenForm(false)
        dispatch(setCurrentDestination({}))
    }
    const handleItineraryButton = destination => {
        setOpenForm(true)
        dispatch(setCurrentDestination(destination))
    }
    const [sheet, SetSheet] = useState(0)
    return (
        <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                {t('manageDestiantionTravel')}
                            </h3>
                            {profile.serviceManagerId && (
                                <div className="relative flex flex-col items-center group w-10">
                                    <Tooltip
                                        content={t('create')}
                                        style="light"
                                        className='w-[80px]'
                                    >
                                        <button
                                            className="inline-flex items-center justify-center w-6 h-6 mr-2 text-indigo-100 transition-colors duration-150  bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-500 ml-4"
                                            onClick={() =>
                                                navigate(
                                                    path.formDestination
                                                )
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
                            )}
                        </div>
                        <form
                            className="flex gap-5 w-full mt-4"
                            onSubmit={form.handleSubmit(
                                handleSubmitSearch
                            )}
                        >
                            <div className="flex-1">
                                <InputField
                                    placeholder={`${t('name')} ${t(
                                        'destinationTravel'
                                    ).toLowerCase()}`}
                                    form={form}
                                    name="key"
                                />
                            </div>
                            {!profile.serviceManagerId && (
                                <div className="flex-1">
                                    <MySelect
                                        placeholder={t(
                                            'serviceManager'
                                        )}
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
                                    placeholder={t('province')}
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
                                        {t('search')}
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
                                        {t('reset')}
                                    </Mybutton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>
                                {t('name')}
                            </Table.HeadCell>
                            {!profile.serviceManagerId && (
                                <Table.HeadCell>
                                    {t('serviceManager')}
                                </Table.HeadCell>
                            )}
                            <Table.HeadCell>
                                {t('province')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('rating')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('status')}
                            </Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {destinations &&
                                destinations.map(destination => (
                                    <Table.Row
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                        key={destination.id}
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {destination.name}
                                        </Table.Cell>
                                        {!profile.serviceManagerId && (
                                            <Table.Cell>
                                                {destination
                                                    .serviceManager
                                                    .user.firstname +
                                                    destination
                                                        .serviceManager
                                                        .user
                                                        .lastname}
                                            </Table.Cell>
                                        )}
                                        <Table.Cell>
                                            {
                                                destination.province
                                                    .name
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {destination.rating}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ToggleButton
                                                status={
                                                    destination.public
                                                }
                                                onClick={() =>
                                                    handleTogglePublic(
                                                        destination.id
                                                    )
                                                }
                                            />
                                        </Table.Cell>
                                        <Table.Cell className="flex gap-4">
                                            <Tooltip
                                                content={t('detail')}
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    onClick={() =>
                                                        handleSelectItem(
                                                            destination
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
                                                content={t('manageItineraries')}
                                                style="light"
                                            >
                                                <Mybutton
                                                    className="flex p-0.5 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-white"
                                                    // eslint-disable-next-line quotes
                                                    onClick={() => {
                                                        handleItineraryButton(
                                                            destination
                                                        )
                                                        SetSheet(
                                                            sheet + 1
                                                        )
                                                    }}
                                                >
                                                    <GiWavyItinerary />
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
            <Itinerary
                open={openForm}
                onClose={onClose}
                sheet={sheet}
            />
        </div>
    )
}

export default DestinationTravel
