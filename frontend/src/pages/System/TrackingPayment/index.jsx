import React, {
    forwardRef,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getServiceManagers,
    serviceManagersSelector
} from '../ServiceManagers/servicemanager.slice'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectUser } from '@pages/Auth/auth.slice'
import Select from 'react-select'
import queryString from 'query-string'
import { getDateString } from '@utils/getDateString'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { Pagination, Table } from 'flowbite-react'
import {
    getAllTrackingPayment,
    trackingPaymentListSelector,
    trackingPaymentPaginationSelector
} from './trackingpayment.slice'
import { useTranslation } from 'react-i18next'
function TrackingPayment() {
    const { t } = useTranslation()
    const serviceManagers = useSelector(serviceManagersSelector)
    const pagination = useSelector(trackingPaymentPaginationSelector)
    const trackingPayments = useSelector(trackingPaymentListSelector)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const profile = useSelector(selectUser)
    const [month, setMonth] = useState(null)
    const [serviceManagerInput, setServiceManagerInput] = useState({
        value: 999,
        label: `${t('filters')} ${t('serviceManager')}`
    })
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        if (profile.serviceManagerId)
            params.serviceManagerId = profile.serviceManagerId
        return {
            monthDate: params.monthDate || '',
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            serviceManagerId: profile.serviceManagerId
                ? profile.serviceManagerId
                : params.serviceManagerId || ''
        }
    }, [location.search, profile])
    const ExampleCustomstartDate = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center  border border-slate-300 hover:border-blue-500 rounded-md overflow-hidden bg-white"
                onClick={onClick}
            >
                <div className="flex flex-col items-center">
                    <span className="font-medium text-md">
                        {t('month')}
                    </span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || t('addMonth')}
                    </span>
                </div>
            </div>
        )
    )
    const handleChangeStartDate = date => {
        setMonth(date)
        const filters = {
            ...queryParams,
            monthDate: getDateString(date)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleChaneServiceManager = value => {
        setServiceManagerInput(value)
        const filters = {
            ...queryParams,
            serviceManagerId: value.value !== 999 ? value.value : ''
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handlePageChange = page => {
        if (!page <= 1 || !page >= pagination.totalPages) {
            const filters = { ...queryParams, page: page }
            navigate(`?${queryString.stringify(filters)}`)
        }
    }
    useEffect(() => {
        const params = {
            serviceManagerId: queryParams.serviceManagerId,
            startDate: queryParams.monthDate,
            endDate: queryParams.monthDate
                ? moment(queryParams.monthDate)
                    .add(1, 'months')
                    .format('YYYY-MM')
                : '',
            page: queryParams.page,
            limit: queryParams.limit
        }
        dispatch(getAllTrackingPayment(params))
    }, [queryParams, dispatch])

    useEffect(() => {
        document.title = t('manageTrackingPayment')
        dispatch(
            getServiceManagers({
                limit: 100
            })
        )
    }, [dispatch, t])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex">
                            <h3 className="font-semibold text-lg text-blue-600">
                                {t('manageTrackingPayment')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-8 px-3 py-5 border border-slate-300 rounded bg-slate-50 mb-5">
                    <div className="w-full lg:basis-1/4 flex justify-between items-center gap-2">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={month}
                            onChange={handleChangeStartDate}
                            selectsStart
                            showMonthYearPicker
                            dateFormat="MMMM yyyy"
                            customInput={<ExampleCustomstartDate />}
                        />
                    </div>
                    <div className="w-full lg:basis-1/4">
                        <Select
                            styles={{
                                control: baseStyles => ({
                                    ...baseStyles,
                                    height: '44px'
                                })
                            }}
                            onChange={handleChaneServiceManager}
                            value={serviceManagerInput}
                            placeholder={`${t('filters')} ${t(
                                'serviceManager'
                            )}`}
                            options={[
                                {
                                    value: 999,
                                    label: `${t('filters')} ${t(
                                        'serviceManager'
                                    )}`
                                },
                                ...serviceManagers.map(
                                    servicemanager => ({
                                        value: servicemanager.id,
                                        label:
                                            servicemanager.user
                                                .firstname +
                                            servicemanager.user
                                                .lastname
                                    })
                                )
                            ]}
                        />
                    </div>
                </div>
                <div className="block w-full overflow-x-auto h-[66vh]">
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>
                                {t('serviceManager')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('phone')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('paymentAccount')}
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('totalPayment')} ($)
                            </Table.HeadCell>
                            <Table.HeadCell>
                                {t('datePayment')}
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {trackingPayments &&
                                trackingPayments.map(tracking => (
                                    <Table.Row key={tracking.id}>
                                        <Table.Cell>
                                            {
                                                tracking
                                                    .serviceManager
                                                    .user.email
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                tracking
                                                    .serviceManager
                                                    .user.firstname
                                            }{' '}
                                            {
                                                tracking
                                                    .serviceManager
                                                    .user.lastname
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                tracking
                                                    .serviceManager
                                                    .user.phone
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {tracking.paymentAccount}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {tracking.amount}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(
                                                tracking.createdAt
                                            ).toLocaleString()}
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
        </>
    )
}

export default TrackingPayment
